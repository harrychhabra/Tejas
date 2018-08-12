var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
/* GET users listing. */
router.get('/list', function(req, res, next) {
  // res.send('respond with a resource');
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      })
    });

module.exports = router;
