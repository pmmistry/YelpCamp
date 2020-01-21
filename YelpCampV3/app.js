var createError = require('http-errors');
var express = require('express');
var bodyParser = require("body-parser");
var indexRouter = require('./routes/index');
var campgroundRouter = require('./routes/campgrounds');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //Get landing page
  res.render("landing");
});

// app.use('/', indexRouter);
app.use('/campgrounds', campgroundRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');

});

app.listen(1011, function () {

	console.log(" The Yelp Camp has started");
}); 
// module.exports = app;
