var express = require("express"),
	mongoose = require("mongoose"),
	app = express(),
	bodyParser = require("body-parser");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", {
	useNewUrlParser: true
});

//SCHEMA 
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 	name: "Midnight Park",
// 	image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677_1280.jpg",
// 	description: "This is a beautiful campsite with midnight views of the stars"
//     },
// function (err, campground) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("Newly created Campground")
// 		console.log(campground);
// 	}
// });

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");

// var campgrounds = [{
// 		name: "Salmon Creek",
// 		image: "https://cdn.pixabay.com/photo/2019/10/02/16/56/landscape-4521413_1280.jpg"
// 	},
// 	{
// 		name: "Granite Hill",
// 		image: "https://cdn.pixabay.com/photo/2019/10/02/17/19/mountains-4521455_1280.jpg"
// 	},
// 	{
// 		name: "Mountain Goat's Rest",
// 		image: "https://cdn.pixabay.com/photo/2019/09/27/11/52/synchronization-4508329_1280.jpg"
// 	}
// ];

app.get("/", function (req, res) {
//Get landing page
	res.render("landing");
});

//INDEX  - show all campgrounds
app.get("/campgrounds", function (req, res) {
//res.render("campgrounds", {	campgrounds: campgrounds});
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
	//Create a new campground and save to DB
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

app.listen(1011, function () {

	console.log(" The Yelp Camp has started");
}); 