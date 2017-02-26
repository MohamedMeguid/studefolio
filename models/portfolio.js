var mongoose = require("mongoose");

var portfolioSchema = new mongoose.Schema({
  name: String,
  image: String,
  student:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
});

var Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
