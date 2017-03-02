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
                            portfolio.update({image: req.file.filename});
                        }
                        portfolio.works.push(work);
                        portfolio.save();
                        req.flash("success", "Your portfolio was successfully created");
                        res.redirect("/students/<%= req.user.username %>");
                    }
                });
            }
        });
    },

    // NEW WORK FORM
    getNewWorkFrom:function(req, res){
        res.render("portfolio/createWork");
    },

    // CREATE WORK
    createWork:function(req, res){
        console.log(req.body);
        Work.create({
            link: req.body.link,
            details: req.body.desc
        }, function(err, work){
            if(err){
                console.log(err);
            } else {
                Portfolio.findOne({student: req.user._id}, function(err, portfolio){
                    if(err){
                        console.log(err);
                    } else {
                        portfolio.works.push(work);
                        portfolio.save();
                        req.flash("success", "Your new piece of work has been added successfully");
                        res.redirect("/students/<%= req.user.username %>");
                    }
                });
            }
        });
    }
};

module.exports = portfolioController;