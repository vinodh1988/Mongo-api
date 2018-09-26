var mongoose = require("mongoose");
var express=require('express');
var passport = require('passport');

var app=express();

var mroute=require('./routes/countryroute');
var uroute=require('./routes/userroutes');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());

app.listen("7030",function(){
    console.log("listening on $7030");
})

mongoose.connect('mongodb://localhost/cams');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo db connection is open");
});

app.use("/countries",mroute);
app.use("/user",uroute);

