var mongoose = require("mongoose");

var workSchema = new mongoose.Schema({
    link: String,
    details: String
});

var Work = mongoose.model("Work", workSchema);

module.exports = Work;