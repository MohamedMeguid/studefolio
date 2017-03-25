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
                    student: req.user._id
                }, function(err, portfolio){
                    if(err){
                        console.log(err.message);
                    } else {
                        if(req.file){
                            portfolio.update({image: req.file.filename}, function(err){
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log("uploaded image to portfolio");
                                    console.log(portfolio.name);
                                    console.log(portfolio.image);
                                }
                            });
                        }
                        portfolio.works.push(work);
                        portfolio.save();
                        req.flash("success", "Your portfolio was successfully created");
                        res.redirect("/students/<%= req.user.username %>");
                    }
                });
            }
        });
    }
    
};

module.exports = portfolioController;