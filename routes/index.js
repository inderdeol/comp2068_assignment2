'use strict';
var express = require('express');
var router = express.Router();


var adsModel = require('../models/ads');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert', function(req, res){
  res.render('insert');
})

// save item to the database
router.post('/insert', function(req, res){
  var ads = new adsModel(req.body);
  // grab parameters from the form and save to the database. 
  ads.save()
  // on successful saving, redirect to the home page.
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
