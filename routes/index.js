var express = require('express');
var router = express.Router();

//########################################
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//#########################################

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReadFormDataSaveMongoDB' });
});


var controllerDatabase = require('../controllers/database');   //this will load the controller file below
router.post("/saveNewCustomer", controllerDatabase.saveNewCustomer); //see controllers/database.js file
router.get("/saveNewCustomer", (req, res) => {
  const message = req.query.message;
  res.render("saveNewCustomer", { message });
});


module.exports = router;
