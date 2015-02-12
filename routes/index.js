var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* Mongoose models */
var mongoose = require('mongoose')
var User = mongoose.model('User')

/* Ensure Authorized User Function */
var ensureAuthorized = function (req, res, next) {
  var bearerToken
  var bearerHeader = req.headers["authorization"]
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ")
    // changed to bearer[0] from bearer[1] to test validation
    bearerToken = bearer[0]
    req.token = bearerToken
    next()
  } else { res.sendStatus(403) };
}

/* GET home page. */
router.get('/', function(req, res) {

  res.send('API up and running')
  /* Old render page useing handlebars files in ./views/ */
  // res.render('index', { title: 'Express' });

});

/* TOKEN based authentication */
/******************************/

router.post('/authenticate', function (req, res, next) {
  User.findOne( { email : req.body.email
                , password : req.body.password
                }
    , function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('Incorrect email/password') ) };
      res.json( { type: true
                , data: user
                , token: user.token
                })
    })
})

router.post('/signup', function (req, res, next) {
  User.findOne( { email : req.body.email
                , password : req.body.password
                }
    , function (err, user) {
      if (err) { return next(err) };
      if (user) { return next(new Error('User already exists') ) };
      var userModel = new User(req.body)
      console.log(req.body)
      // userModel.name = req.body.name
      // userModel.email = req.body.email
      // userModel.password = req.body.password
      userModel.save(function (err, user) {
        user.token = jwt.sign(user, 'pandaistheperfectpuppybutilovelucytoo')
        user.save(function (err, userWithToken) {
          res.json( { type: true
                    , data: userWithToken
                    , token: userWithToken.token
                    })
        })
      })
    })
})

/* GET /me to test user authentication */
router.get('/me', ensureAuthorized, function (req, res, next) {
  User.findOne( { token: req.token }
    , function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('No user found for submitted token') ) };
      res.json( { type: true
                , data: user
                })
    })
})

module.exports = router;
