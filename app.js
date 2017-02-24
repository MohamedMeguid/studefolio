var express       = require("express"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    localStrategy = require("passport-local").Strategy;

//REQUIRE MODELS
var Student = require("./models/student");

// CONNECT DATABASE
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/studefolio");

// CONFIGURE APP AND MIDDLEWARE
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(require("express-session")({
  secret: "Ana msh fahem eh da f3ln bs eshta",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

// LOCALS
app.use(function(req, res, next){
   res.locals.currentStudent = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// ROUTES
app.use(require("./routes/index"));
app.use(require("./routes/students"));


// SERVER LISTENING
app.listen(8080, function(){
    console.log("Studefolio up and running! on port:8080");
});
