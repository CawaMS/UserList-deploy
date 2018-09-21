var express = require('express');
const tracing = require('@opencensus/nodejs');
const stackdriver = require('@opencensus/exporter-stackdriver');
const stdin = process.openStdin();

const defaultConfig = {
  name: 'addUser',
  samplingRate: 1.0  // always sample
};

const exporter = new stackdriver.StackdriverTraceExporter({projectId: getProjectId()});

const tracer = tracing.start().tracer;

tracer.registerSpanEventListener(exporter);


var bodyParser     =         require("body-parser");
var app            =         express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var router = app.Router();//express.Router();
//
//
//
const winston = require('../config/winston');

/* GET userlist. */
app.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

function delay() {
  const span = tracer.startChildSpan('calculatePrime');
  span.start();
  for (let i = 0; i < 10000000; i++) {}
  span.end();
}

/* POST to adduser. */
app.post('/adduser', function(req, res) {

 tracer.startRootSpan(defaultConfig, rootSpan => {
  var db = req.db;

  var isValidZipCode = false;
  var location = req.body.location.toLowerCase();
  var zipCode = req.body.zip.toLowerCase();
  
  winston.log('info', " adding new user from : " +  location + ", zip code : " + zipCode);
  
  if (location == "us" || location == "usa") {	  
	  isValidZipCode = testValidUSZipCode(zipCode);
  }//else
  //if (location == "canada" || location == "ca"){
	//  isValidZipCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode);
  // }
  if (!isValidZipCode){
    //winston.log('error', " invalid zip code provided ...");
    //res.statusCode = 500;
    //res.send( { msg: "Invalid Zip Code"} );
    handleInvalidZipCode(res);
  }else{
	  var collection = db.get('userlist');
	  collection.insert(req.body, function(err, result){
		res.send(
		  (err === null) ? { msg: '' } : { msg: err }
		);
	  });
  }

    rootSpan.end();
  });
});


function testValidUSZipCode(zipCode){

  const span = tracer.startChildSpan('validateZipCode');
  span.start();

  var isValid = false;
  isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

  delay();

  span.end();
  return isValid;
}

function handleInvalidZipCode(res){
  const span = tracer.startChildSpan('handleInvalidZipCode');
  span.start();

  winston.log('error', " invalid zip code provided ...");
  res.statusCode = 500;

  delay();
  
  res.send( { msg: "Invalid Zip Code"} );
  span.end();
}

/* DELETE to deleteuser. */
app.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

function getProjectId() {
  return "userlist-216918";
}

module.exports = app;