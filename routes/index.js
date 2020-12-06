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

// save ad to the database
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

/* GET update page from server */
router.get('/update/:id', function (req, res) {
  adsModel.findById(req.params.id, function (err, ad) {
      if (err){
        console.log(err);
      } 
      res.render('update', { ad: ad})
  })
});

// post method to update send new data to mongoDb and update them.
router.post('/update', function (req, res) {
  console.log(req.body);
  adsModel.findByIdAndUpdate(req.body.id, { item: req.body.item, description: req.body.description, price: req.body.price, condition: req.body.condition}, function (err, model) {
      console.log(err);
      res.redirect('/');
  });
});

module.exports = router;
