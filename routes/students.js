var express  = require("express");
var router   = express.Router();
var passport = require("passport");

// REQUIRE MODEL
var Student = require("../models/student");

// STUDENT AUTHENTICATION ROUTES
// REGISTRATION ROUTES
router.get("/students/register", function(req, res){
  res.render("student/register");
});

router.post("/students/register", function(req, res){
  var newStudent = new Student({
    username: req.body.username
  });
  Student.register(newStudent, req.body.password, function(err, student){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/students/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to Studefolio, " + student.username);
      res.redirect("/");
    });
  });
});

// LOGIN ROUTES
router.get("/students/login", function(req, res){
  res.render("student/login");
});

router.post("/students/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/students/login",
    successFlash: "Welcome back",
    failureFlash: true
  }), function(req, res){
});

// EXPORT
module.exports = router;
