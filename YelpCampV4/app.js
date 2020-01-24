var express = require("express"),
	mongoose = require("mongoose"),
	app = express(),
	bodyParser = require("body-parser");

mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/yelp_camp", {
// 	useNewUrlParser: true
// });

mongoose.connect("mongodb://admin:admin12345@97f85327-b32a-4537-91e4-ce4ad95b102c-0.blijs0dd0dcr4f55oehg.databases.appdomain.cloud:31929,97f85327-b32a-4537-91e4-ce4ad95b102c-1.blijs0dd0dcr4f55oehg.databases.appdomain.cloud:31929/yelp_camp?ssl=true&authSource=admin&replicaSet=replset", {
	useNewUrlParser: true
}).catch(err => console.log(err));
 
//SCHEMA 
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
	name: "Midnight Park",
	image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_1280.jpg",
	description: "This is a beautiful campsite with midnight views of the stars"
    },
function (err, campground) {
	if (err) {
		console.log(err);
	} else {
		console.log("Newly created Campground")
		console.log(campground);
	}
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
//Get landing page
	res.render("landing");
});

//INDEX  - show all campgrounds
app.get("/campgrounds", function (req, res) {
// Get all campground from DB
Campground.find({},function(err,allCampgrounds){
	if(err){
		console.log(err)
	} else {
		res.render("index", {campgrounds: allCampgrounds});
	}});
});
//Create - add new campground to db 
app.post("/campgrounds", function (req, res) {
	//get data from form & add to campgrounds array 
	var name = req.body.name;
	var image = req.body.image;
	var desc= req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
	}
	//create a new campground and save to DB
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			//redirect back to campground
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});

//SHOW - show more info about  1 campground
app.get("/campgrounds/:id", function(req,res){
	//find the campground with provided id and then show info about that campground

	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	})
	//req.params.id
	//res.render("show");
});

app.listen(process.env.PORT || 1011, function () {

	console.log(" The Yelp Camp has started");
}); 