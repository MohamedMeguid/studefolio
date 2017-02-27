/* jshint esversion: 6 */

//REQUIRE MODELS
let Student = require("./models/student");
let Work = require("./models/work");
let Portfolio = require("./models/portfolio");

function clearDB(){
    Portfolio.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Cleared Portfolio Collection");
            Work.remove({}, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Cleared Work Collection");
                }
            });
        }
    });
}

module.exports = clearDB;