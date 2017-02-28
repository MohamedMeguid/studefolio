/* jshint esversion: 6 */

// REQUIRE MODELS
let Work = require("../models/work");
let Portfolio = require("../models/portfolio");

let portfolioController = {
    
    getNewPorfolioForm: function(req, res){
        res.render("portfolio/newPortfolio");
    },

    createPortfolio: function(req, res){
        Work.create({
        link: req.body.link,
        details: req.body.desc
        }, function(err, work){
            if(err){
                console.log(err.message);
            } else {
                Portfolio.create({
                    name: req.body.name,
                    image: req.file.filename,
                    student: req.user._id
                }, function(err, portfolio){
                    if(err){
                        console.log(err.message);
                    } else {
                        portfolio.works.push(work);
                        portfolio.save();
                        req.flash("success", "Your portfolio was successfully created");
                        res.redirect("/students/<%= req.user.username %>")
                    }
                });
            }
        });
    }
};

module.exports = portfolioController;