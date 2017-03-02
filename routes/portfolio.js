/* jshint esversion: 6 */

let express = require("express");
let router = express.Router();

let middleware = require("../middleware");

// REQUIRE MULTER FOR FILE/IMAGE UPLOADS    
let multer        = require("multer");
let upload        = multer({ dest: "public/uploads/" });

// REQUIRE PORTFOLIO CONTROLLER
let portfolioController = require("../controllers/portfolioController");
let workController = require("../controllers/workController");

// NEW ROUTE
router.get("/students/:username/portfolio/new", middleware.isLoggedIn, portfolioController.getNewPorfolioForm);

// CREATE ROUTE
router.post("/students/:username/portfolio", middleware.isLoggedIn, upload.single('profilepic'), portfolioController.createPortfolio);

// NEW WORK ROUTE
router.get("/students/:username/portfolio/addWork", middleware.isLoggedIn, workController.getNewWorkFrom);

// CREATE WORK ROUTE
router.post("/students/:username/portfolio/addWork", middleware.isLoggedIn, workController.createWork);

// EDIT WORK ROUTE
router.get("/students/:username/portfolio/:work/edit", middleware.isLoggedIn, workController.getEditWorkForm);

router.put("/students/:username/portfolio/:work", middleware.isLoggedIn, workController.editWork);

// DELETE WORK ROUTE
router.get("/students/:username/portfolio/:work", middleware.isLoggedIn, workController.deleteWork);

module.exports = router;

