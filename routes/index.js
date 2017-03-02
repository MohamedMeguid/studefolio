/* jshint esversion: 6 */

var express = require("express");
var router = express.Router();

// REQUIRE MODELS
var Work = require("../models/work");
var Portfolio = require("../models/portfolio");

router.get("/", function(req, res){
  res.render("landing");
});

// router.get("/works", function(req, res){
//   let portfolios      = Portfolio.find({}),
//       totalPortfolios = portfolios.length,
//       pageSize        = 10,
//       pageCount       = Math.ceil(totalPortfolios/pageSize),
//       currentPage     = 1,
//       portfoliosArray = [],
//       portfoliosList  = [];

//   //split portfolios into groups
//   while (portfolios.length > 0) {
//       portfoliosArray.push(portfolios.splice(0, pageSize));
//   }

//   //set current page if specifed as get variable (eg: /?page=2)
//   if (typeof req.query.page !== 'undefined') {
//       currentPage = +req.query.page;
//   }

//   portfoliosList = portfoliosArray[+currentPage - 1];

//   res.render("works", {
//     portfoliosList: portfoliosList,
//     pageSize: pageSize,
//     pageCount: pageCount,
//     totalPortfolios: totalPortfolios,
//     currentPage: currentPage
//     });
// });

router.get("/works", function(req, res){
  
  let pageSize        = 10,
      currentPage     = 1,
      portfoliosArray = [],
      portfoliosList  = [];
  
  Portfolio.find({}).populate("works").exec(function(err, portfolios){

    if(err){
      return console.log(err);
    }

    let totalPortfolios = portfolios.length;
    let pageCount = Math.ceil(totalPortfolios/pageSize);

    while (portfolios.length > 0) {
        portfoliosArray.push(portfolios.splice(0, pageSize));
    }

    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    portfoliosList = portfoliosArray[+currentPage - 1];
    
    res.render("works", {
      portfolios: portfoliosList,
      pageSize: pageSize,
      pageCount: pageCount,
      totalPortfolios: totalPortfolios,
      currentPage: currentPage
      });

    });
    
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "bye bye");
  res.redirect("/");
});

module.exports = router;
