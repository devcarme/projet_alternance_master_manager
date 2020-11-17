var express = require('express');
var router = express.Router();
var connection = require('./bdd');
var session = require('express-session');
var bodyParser = require("body-parser");
var fs = require('fs');

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Session Setup 
router.use(session({  
    secret: 'Your_Secret_Key', 
    resave: true,
    saveUninitialized: true
})) 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

router.get('/getAll', (req,res, next) => {
    connection.query('SELECT * FROM UTILISATEUR', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});



module.exports = router;