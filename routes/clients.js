/* jshint esversion: 6 */

var express = require("express");
var router = express.Router();

var clientController = require("../controllers/clientController");

router.get("/clients", function(req, res){
  res.render("client/clientMain");
});

router.get("/clients/register" , clientController.getClientRegisterForm);

router.post("/clients/register", clientController.registerClient);

router.get("/clients/login" , clientController.getClientLoginForm);

router.post("/clients/login", clientController.loginClient);

module.exports = router;