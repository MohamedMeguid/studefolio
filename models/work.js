var mongoose = require("mongoose");

var workSchema = new mongoose.Schema({
    link: String,
    details: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Work = mongoose.model("Work", workSchema);

module.exports = Work;