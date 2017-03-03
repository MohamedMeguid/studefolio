/* jshint esversion: 6 */

let passport = require("passport");

// REQUIRE MODELS
let Student = require("../models/student");
let Portfolio = require("../models/portfolio");

let studentController = {

  //STUDENT REGISTRATION CONTROLLERS
  getStudentRegisterForm:function(req, res){
    res.render("student/register");
  },

  registerStudent:function(req, res){
    let newStudent = new Student({
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
        res.redirect("/students/" + req.user.username);
      });
    });
  },

  //STUDENT LOGIN CONTROLLERS
  getStudentLoginForm:function(req, res){
    res.render("student/login");
  },

  loginStudent:function(req, res){
    req.flash("success", "Welcome back, " + req.user.username);
    res.redirect("/students/" + req.user.username);
  },

  // STUDENT PROFILE
  getStudentProfile:function(req, res){
    Portfolio.findOne({student: req.user._id}).populate("works").exec(function(err, portfolio){
      if(err){
        console.log(err.message);
      } else {
        res.render("student/profile", {student: req.user, portfolio: portfolio});
      }
    });
  }

};

module.exports = studentController;
