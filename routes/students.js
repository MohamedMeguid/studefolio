var express  = require("express");
var router   = express.Router();
var passport = require("passport");

// REQUIRE MY MIDDLEWARE
var middleware = require("../middleware");

// REQUIRE STUDENT CONTROLLER
var studentController = require("../controllers/studentController");

// STUDENT AUTHENTICATION ROUTES
// REGISTRATION ROUTES
router.get("/students/register", studentController.getStudentRegisterForm);

router.post("/students/register", studentController.registerStudent);

// LOGIN ROUTES
router.get("/students/login", studentController.getStudentLoginForm);

router.post("/students/login", passport.authenticate("local",
  {
    failureRedirect: "/students/login",
    failureFlash: true
  }), studentController.loginStudent);

// STUDENT PROFILE
router.get("/students/:username", middleware.isLoggedIn, studentController.getStudentProfile);

// EXPORT
module.exports = router;
