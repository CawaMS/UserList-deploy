var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var location = req.body.location;
    var zipCode = req.body.zipCode;

    //test for valid zipcode
    var isValidZipCode = false;

    //winston.log('info', " adding new user from : " +  location + ", zip code : " + zipCode);
  
    if (location == "us" || location == "usa") {	  
	  isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
    }else if (location == "canada" || location == "ca"){
	  isValidZipCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode);
    }

    if(isValidZipCode){
        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail,
            "location" : location,
            "zipCode": zipCode
            }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("userlist");
            }
    });
    }else{
        res.statusCode = 500;
        res.send( { msg: "Invalid Zip Code"} );
    }
    
});

module.exports = router;
