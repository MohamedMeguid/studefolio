/* jshint esversion: 6 */

let clientController = {

  //STUDENT REGISTRATION CONTROLLERS
  getClientRegisterForm:function(req, res){
    res.render("client/register");
  },

  registerClient:function(req, res){
      req.flash("error", "Feature not yet implemented");
      res.redirect("/clients");
  },

  //STUDENT LOGIN CONTROLLERS
  getClientLoginForm:function(req, res){
    res.render("client/login");
  },

  loginClient:function(req, res){
    req.flash("error", "Feature not yet implemented");
    res.redirect("/clients");
  }

};

module.exports = clientController;