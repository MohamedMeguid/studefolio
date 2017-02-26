/* jshint esversion: 6 */

let express = require("express");
let router = express.Router();

let middleware = require("../middleware");

// REQUIRE MULTER FOR FILE/IMAGE UPLOADS    
let multer        = require("multer");
let upload        = multer({ dest: "public/uploads/" });

// NEW ROUTE
router.get("/students/:username/portfolio/new", middleware.isLoggedIn, function(req, res){
    res.render("portfolio/newPortfolio");
});

module.exports = router;

