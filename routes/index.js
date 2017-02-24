var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.render("landing");
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "bye bye");
  res.redirect("/");
});

module.exports = router;
