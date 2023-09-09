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
    res.render("LandingPage");

});


// -----------signup---------------

router.get("/signup", (req, res, next) => {
  res.render("signup");
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
  res.render("signin");
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

router.get("/home",isLoggedIn,async(req,res,next)=>{
  try {
    //  const center = await Centers.findOne({center_id: req.user.slotToken});
    const centerId = await Centers.findOne({ "center_id" :1});
     console.log(req.user.slotToken,centerId);
      // res.render("Homepage");
  } catch (error) {
    
  }
 
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
  res.render("getemail");
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

router.get("/book", isLoggedIn,async function (req, res, next) {
  try {
    
    const date= new Date();
    const today= date;
    const centers = await Centers.find();
  // console.log(centers)
    res.render("BookingPage",{centers,date:today});
  } catch (error) {
    console.log(error)
  }
 
});

// --------------------/confirmation==========

router.get("/confirmation/:idx",isLoggedIn,async(req,res,next)=>{
//  await UserModel.slotToken = 1; 
// res.render("confirm")
try {
  const user =req.user;
if (user.slotToken !== null) {
  res.render("sorry")
}else{

  // console.log(req.params.idx)
   user.slotToken = req.params.idx;
   user.save();
   res.redirect("/home");
} 
}catch (error) {
  console.log(error)


}
});


// -------------ISloggedIn Function-------------

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}







module.exports = router;
