var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var studentSchema = new mongoose.Schema({
  username: String,
  password: String
});

studentSchema.plugin(passportLocalMongoose);

var Student = mongoose.model("Student", studentSchema);

// EXPORT
module.exports = Student;
