var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/Usermodel");
passport.use(new LocalStrategy(UserModel.authenticate()));
const { sendmail } = require("../utils/mail");


// ================================================= Data =======================================
var centers = [
  {
    center_id: 0,
    center_name: "Sample Vaccination Center 1",
    address: "123 Main Street, Cityville",
    pincode: "123456",
    available_slots: { slots: "50" },
  },
  {
    center_id: 1,
    center_name: "Sample Vaccination Center 1",
    address: "567 Redwood Drive, Countyville",
    pincode: "234567",
    available_slots: { slots: "75" },
  },
  {
    center_id: 2,
    center_name: "Sample Vaccination Center 2",
    address: "789 Elm Street, Hamletville",
    pincode: "567890",
    available_slots: { slots: "24" },
  },
  {
    center_id: 3,
    center_name: "Sample Vaccination Center 3",
    address: "123 Redwood Drive, Countyville",
    pincode: "123456",
    available_slots: { slots: "75" },
  },
  {
    center_id: 4,
    center_name: "Sample Vaccination Center 4",
    address: "321 Pine Road, Suburbia",
    pincode: "345678",
    available_slots: { slots: "80" },
  },
  {
    center_id: 5,
    center_name: "Sample Vaccination Center 5",
    address: "987 Cedar Lane, Hamletville",
    pincode: "456789",
    available_slots: { slots: "70" },
  },
  {
    center_id: 6,
    center_name: "Sample Vaccination Center 6",
    address: "567 Redwood Drive, Countyville",
    pincode: "234567",
    available_slots: { slots: "90" },
  },
  {
    center_id: 7,
    center_name: "Sample Vaccination Center 7",
    address: "890 Maple Lane, Suburbia",
    pincode: "789123",
    available_slots: { slots: "75" },
  },
  {
    center_id: 8,
    center_name: "Sample Vaccination Center 8",
    address: "123 Oak Street, Townsville",
    pincode: "345678",
    available_slots: { slots: "85" },
  },
  {
    center_id: 9,
    center_name: "Sample Vaccination Center 9",
    address: "456 Pine Road, Cityville",
    pincode: "456789",
    available_slots: { slots: "65" },
  },
  {
    center_id: 10,
    center_name: "Sample Vaccination Center 10",
    address: "789 Elm Street, Hamletville",
    pincode: "567890",
    available_slots: { slots: "24" },
  },
  {
    center_id: 11,
    center_name: "Sample Vaccination Center 11",
    address: "123 Redwood Drive, Countyville",
    pincode: "123456",
    available_slots: { slots: "75" },
  },
  {
    center_id: 12,
    center_name: "Sample Vaccination Center 12",
    address: "456 Maple Lane, Suburbia",
    pincode: "789012",
    available_slots: { slots: "64" },
  },
  {
    center_id: 13,
    center_name: "Sample Vaccination Center 13",
    address: "789 Oak Avenue, Villageland",
    pincode: "567890",
    available_slots: { slots: "85" },
  },
  {
    center_id: 14,
    center_name: "Sample Vaccination Center 14",
    address: "321 Pine Road, Suburbia",
    pincode: "345678",
    available_slots: { slots: "24" },
  },
  {
    center_id: 15,
    center_name: "Sample Vaccination Center 15",
    address: "987 Cedar Lane, Hamletville",
    pincode: "456789",
    available_slots: { slots: "64" },
  },
  {
    center_id: 16,
    center_name: "Sample Vaccination Center 16",
    address: "567 Redwood Drive, Countyville",
    pincode: "234567",
    available_slots: { slots: "75" },
  },
  {
    center_id: 17,
    center_name: "Sample Vaccination Center 17",
    address: "890 Maple Lane, Suburbia",
    pincode: "789123",
    available_slots: { slots: "95" },
  },
  {
    center_id: 18,
    center_name: "Sample Vaccination Center 18",
    address: "123 Oak Street, Townsville",
    pincode: "345678",
    available_slots: { slots: "50" },
  },
  {
    center_id: 19,
    center_name: "Sample Vaccination Center 19",
    address: "456 Pine Road, Cityville",
    pincode: "456789",
    available_slots: { slots: "64" },
  },
  {
    center_id: 20,
    center_name: "Sample Vaccination Center 20",
    address: "789 Elm Street, Hamletville",
    pincode: "567890",
    available_slots: { slots: "72" },
  },
  {
    center_id: 21,
    center_name: "Sample Vaccination Center 21",
    address: "123 Redwood Drive, Countyville",
    pincode: "123456",
    available_slots: { slots: "75" },
  },
  {
    center_id: 22,
    center_name: "Sample Vaccination Center 22",
    address: "456 Maple Lane, Suburbia",
    pincode: "789012",
    available_slots: { slots: "85" },
  },
  {
    center_id: 23,
    center_name: "Sample Vaccination Center 23",
    address: "789 Oak Avenue, Villageland",
    pincode: "567890",
    available_slots: { slots: "36" },
  },
  {
    center_id: 24,
    center_name: "Sample Vaccination Center 24",
    address: "321 Pine Road, Suburbia",
    pincode: "345678",
    available_slots: { slots: "47" },
  },
  {
    center_id: 25,
    center_name: "Sample Vaccination Center 25",
    address: "987 Cedar Lane, Hamletville",
    pincode: "456789",
    available_slots: { slots: "67" },
  },
  {
    center_id: 26,
    center_name: "Sample Vaccination Center 26",
    address: "567 Redwood Drive, Countyville",
    pincode: "234567",
    available_slots: { slots: "5" },
  },
  {
    center_id: 27,
    center_name: "Sample Vaccination Center 27",
    address: "890 Maple Lane, Suburbia",
    pincode: "789123",
    available_slots: { slots: "57" },
  },
  {
    center_id: 28,
    center_name: "Sample Vaccination Center 28",
    address: "123 Oak Street, Townsville",
    pincode: "345678",
    available_slots: { slots: "71" },
  },
  {
    center_id: 29,
    center_name: "Sample Vaccination Center 29",
    address: "456 Pine Road, Cityville",
    pincode: "456789",
    available_slots: { slots: "26" },
  },
  {
    center_id: 30,
    center_name: "Sample Vaccination Center 30",
    address: "789 Elm Street, Hamletville",
    pincode: "567890",
    available_slots: { slots: "75" },
  },
  {
    center_id: 31,
    center_name: "Sample Vaccination Center 31",
    address: "123 Redwood Drive, Countyville",
    pincode: "123456",
    available_slots: { slots: "64" },
  },
  {
    center_id: 32,
    center_name: "Sample Vaccination Center 32",
    address: "456 Maple Lane, Suburbia",
    pincode: "789012",
    available_slots: { slots: "27" },
  },
  {
    center_id: 33,
    center_name: "Sample Vaccination Center 33",
    address: "789 Oak Avenue, Villageland",
    pincode: "567890",
    available_slots: { slots: "98" },
  },
  {
    center_id: 34,
    center_name: "Sample Vaccination Center 34",
    address: "321 Pine Road, Suburbia",
    pincode: "345678",
    available_slots: { slots: "75" },
  },
  {
    center_id: 35,
    center_name: "Sample Vaccination Center 35",
    address: "987 Cedar Lane, Hamletville",
    pincode: "456789",
    available_slots: { slots: "25" },
  },
  {
    center_id: 36,
    center_name: "Sample Vaccination Center 36",
    address: "567 Redwood Drive, Countyville",
    pincode: "234567",
    available_slots: { slots: "75" },
  },
];

// ================================================= Data =======================================


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

router.get("/home",isLoggedIn,(req,res,next)=>{
  res.render("Homepage")
  console.log(centers[req.user.slotToken]);
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
  console.log(req.user);
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

router.get("/book", isLoggedIn,function (req, res, next) {
  const date= new Date();
  const today= date;

  res.render("BookingPage",{centers,date:today});
 
});

// --------------------/confirmation==========

router.get("/confirmation/:idx",isLoggedIn,async(req,res,next)=>{
//  await UserModel.slotToken = 1; 
// res.render("confirm")
const user =req.user;
if (user.slotToken !== null) {
  res.render("sorry")
}
// console.log(req.params.idx)
 user.slotToken = req.params.idx;
 user.save();
 res.redirect("/home/" + req.params.idx);
});


// -------------ISloggedIn Function-------------

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}







module.exports = router;
