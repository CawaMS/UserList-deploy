var express = require('express');


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

/* POST to adduser. */
app.post('/adduser', function(req, res) {
  var db = req.db;

  var isValidZipCode = false;
  //var isValidZipCode = true;
  var location = req.body.location.toLowerCase();
  var zipCode = req.body.zip.toLowerCase();
  
  winston.log('info', " adding new user from : " +  location + ", zip code : " + zipCode);
  
  if (location == "us" || location == "usa") {	  
	  isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
  }else
  if (location == "canada" || location == "ca"){
	  isValidZipCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode);
   }
  if (!isValidZipCode){
      winston.log('error', " invalid zip code provided ...");
      res.statusCode = 500;
        res.send( { msg: "Invalid Zip Code"} );
  }else{
	  var collection = db.get('userlist');
	  collection.insert(req.body, function(err, result){
		res.send(
		  (err === null) ? { msg: 'successful request' } : { msg: err }
		);
	  });
  }
});

/* DELETE to deleteuser. */
app.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = app;