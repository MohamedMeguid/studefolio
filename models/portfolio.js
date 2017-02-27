var mongoose = require("mongoose");

var portfolioSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  image: String,
  student:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },
  works: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Work"
  }]
});

var Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
