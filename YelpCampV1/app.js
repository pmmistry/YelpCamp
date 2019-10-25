var express = require("express"),
	//mongoose = require("mongoose"),
	app = express(),
	bodyParser = require("body-parser");

//mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/yelp_camp", {
//	useNewUrlParser: true
//});

//SCHEMA 
// var campgroundSchema = new mongoose.Schema({
// 	name: String,
// 	image: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 	name: "Salmon Creek",
// 	image: "https://cdn.pixabay.com/photo/2019/10/02/16/56/landscape-4521413_1280.jpg"
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

var campgrounds = [{
		name: "Salmon Creek",
		image: "https://cdn.pixabay.com/photo/2019/10/02/16/56/landscape-4521413_1280.jpg"
	},
	{
		name: "Granite Hill",
		image: "https://cdn.pixabay.com/photo/2019/10/02/17/19/mountains-4521455_1280.jpg"
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://cdn.pixabay.com/photo/2019/09/27/11/52/synchronization-4508329_1280.jpg"
	}
];

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/campgrounds", function (req, res) {
res.render("campgrounds", {	campgrounds: campgrounds});
// Get all campground 
// Campground.find({},function(err,allCampgrounds){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		res.render("campgrounds", {	campgrounds: allCampgrounds});
// 	}});
});

app.post("/campgrounds", function (req, res) {
	//get data from form & add to campgrounds array 
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name: name,
		image: image
	}
	//campgrounds.push(newCampground);
    //Create a new campground and save to db

	//regirect to campgrounds page
	res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function (req, res) {
	res.render("new.ejs");
});


app.listen(1011, function () {

	console.log(" The Yelp Camp has started");
}); 