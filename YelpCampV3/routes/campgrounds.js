var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

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

//INDEX  - show all campgrounds
router.get("/", function (req, res) {
  // Get all campground from DB
  Campground.find({},function(err,allCampgrounds){
    if(err){
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }});
  });

  //Create - add new campground to db 
  router.post("/", function (req, res) {
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
  router.get("/new", function (req, res) {
    res.render("new");
  });
  
  //SHOW - show more info about  1 campground
  router.get("/:id", function(req,res){
    //find the campground with provided id and then show info about that campground
    Campground.findById(req.params.id,function(err,foundCampground){
      if(err){
        console.log(err);
      }else{
        res.render("show", {campground: foundCampground});
      }
    })
  });

module.exports = router;
