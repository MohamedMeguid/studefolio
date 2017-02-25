/* jshint esversion: 6 */

var passport = require("passport");

let middleware = {

  isLoggedIn:function(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "You must be signed in to do that!");
    res.redirect("/students/login");
  }

};

module.exports = middleware;
