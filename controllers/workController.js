 /* jshint esversion: 6 */

 // REQUIRE MODELS
let Work = require("../models/work");
let Portfolio = require("../models/portfolio");

 let workController = {
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
    },

    // EDIT WORK
    getEditWorkForm:function(req, res){
      Work.findById(req.params.work, function(err, work){
        res.render("portfolio/editWork", {work: work});
      });
    },

    editWork:function(req, res){
      Work.findByIdAndUpdate(req.params.work, {link: req.body.link, details: req.body.desc}, function(err, updatedWork){
        if(err){
          console.log(err);
        } else {
          req.flash("success", "Edited Work successfully");
          res.redirect("/students/<%= req.user.username %>");
        }
      });
    },

    // DELETE WORK
    deleteWork:function(req, res){
      Work.findByIdAndRemove(req.params.work, function(err){
        if(err){
          return console.log(err);
        }
        res.redirect("/students/<%= req.user.username %>");
      });
    }
 };

 module.exports = workController;