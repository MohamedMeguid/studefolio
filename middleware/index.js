var passport = require("passport");

function inLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You must be signed in to do that!");
  res.redirect("/students/login");
}
