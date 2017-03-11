/* jshint esversion: 6 */

let express       = require("express"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    localStrategy = require("passport-local").Strategy,
    methodOverride = require("method-override");

//REQUIRE MODELS
let Student = require("./models/student");
let Work = require("./models/work");
let Portfolio = require("./models/portfolio");

//REQUIRE CLEARDB 
let clearDB = require("./clearDB");

// CONNECT DATABASE
mongoose.Promise = global.Promise;
let url = process.env.DATABASEURL || "mongodb://localhost:27017/studefolio";
mongoose.connect(url);

// CONFIGURE APP AND MIDDLEWARE
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// CLEAR DATABASE
//clearDB();

app.use(require("express-session")({
  secret: "Ana msh fahem eh da f3ln bs eshta",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// STUDENT AUTHENTICATION
passport.use(new localStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

// LOCALS
app.use(function(req, res, next){
   res.locals.currentStudent = req.user;
   res.locals.currentClient = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// ROUTES
app.use(require("./routes/index"));
app.use(require("./routes/students"));
app.use(require("./routes/portfolio"));
app.use(require("./routes/clients"));


// SERVER LISTENING
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Studefolio up and running!");
});
