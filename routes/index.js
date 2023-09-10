var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/Usermodel");
const Centers = require("../models/centerInfo");
passport.use(new LocalStrategy(UserModel.authenticate()));
const { sendmail } = require("../utils/mail");
const center = require("../models/centerInfo");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("LandingPage", { user: req.user });
});

// -----------signup---------------

router.get("/signup", (req, res, next) => {
  res.render("signup", { user: req.user });
});
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await UserModel.register({ username, email }, password);
    res.redirect("/signin");
  } catch (error) {
    res.send(error.message);
  }
});

// -----------signIn---------------

router.get("/signin", (req, res, next) => {
  res.render("signin", { user: req.user });
});
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/signin",
  }),
  (req, res, next) => {}
);

// ----------------/home

router.get("/home", isLoggedIn, async (req, res, next) => {
  try {
    const center = await Centers.findOne({ center_id: req.user.slotToken });
    //  console.log(centerId);
    res.render("Homepage", { center, user: req.user });
  } catch (error) {}
});

// ----------- SignOut--------------------

router.get("/signout", (req, res, next) => {
  req.logOut(() => {
    res.redirect("/signin");
  });
});

// ----------- Reset --------------------

router.get("/reset", (req, res, next) => {
  res.render("reset", { user: req.user });
});

router.post("/reset/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    await user.changePassword(req.body.oldpassword, req.body.newpassword);
    res.redirect("/signin");
  } catch (error) {
    console.log(error);
  }
});

// ----------------- Get mail page ---------------

router.get("/getEmail", (req, res, next) => {
  res.render("getemail", { user: req.user });
});
router.post("/getEmail", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user === null) {
      return res.send(
        "Account not found! Try again <a href='/getEmail'>Forget PAssword</a>"
      );
    }
    sendmail(req, res, user);
  } catch (error) {
    res.send(error);
  }
});

// ---------------- forget PAssword----------

router.get("/change-password/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.render("change-Password", { user });
  } catch (error) {
    res.send(error);
  }
});

router.post("/change-password/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    await user.setPassword(req.body.password);
    await user.save();
    res.redirect("/signin");
  } catch (error) {
    res.send(error);
  }
});

// ------------------ Booking Page------------

router.get("/book", isLoggedIn, async function (req, res, next) {
  try {
    const date = new Date();
    const today = date;
    const centers = await Centers.find();
    const user = req.user;
    const center = await Centers.findOne({ center_id: req.user.slotToken });
 
    res.render("BookingPage", { centers, center,date: today, user });
  } catch (error) {
    console.log(error);
  }
});
// ------------------ Cancel Slot------------

router.get("/cancelSlot", isLoggedIn, async function (req, res, next) {
  try {
   const user= req.user;
    const center = await Centers.findOne({ center_id: user.slotToken });
    let slotCount = await center.available_slots;
    center.available_slots = slotCount + 1;
    center.save();
   user.slotToken = null
   user.save();
    // console.log(user.slotToken);
    res.redirect("/home")

  } catch (error) {
    res.send(error);
  }
});

// --------------------/confirmation==========

router.get("/confirmation/:idx", isLoggedIn, async (req, res, next) => {
  //  await UserModel.slotToken = 1;
  // res.render("confirm")
  try {
    const user = req.user;
    if (user.slotToken !== null) {
      res.render("sorry", { user: req.user });
    } else {
      user.slotToken = req.params.idx;
      user.save();
      const center = await Centers.findOne({ center_id: user.slotToken });
          let slotCount = await center.available_slots
          center.available_slots= slotCount-1
          center.save();
      // console.log(center.available_slots);

      res.redirect("/home");
    }
  } catch (error) {
    console.log(error);
  }
});

// --------------------- FAQ------------------

router.get("/FAQ",(req,res)=>{
  res.render("FAQ",{user:req.user})
})
// --------------------- Not Available------------------

router.get("/notAvail",(req,res)=>{
  res.render("NotAvail",{user:req.user})
})
// --------------------- Partner------------------

router.get("/partner",(req,res)=>{
  res.render("Partners",{user:req.user})
})

// -------------ISloggedIn Function-------------

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
