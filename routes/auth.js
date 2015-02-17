var jwt = require('jsonwebtoken')
var pass = require('pwd')
var mongoose = require('mongoose')
var User = mongoose.model('User')

var auth = {
  login : function (req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    // if username or password aren't supplied, send back a 401
    if (username == '' || password == '') {
      var err = new Error('Invalid credentials')
      err.status = 401
      return next(err)
    };

    // check DB to see if credentials are valid
    auth.validate(username, password, function (err, dbUserObj) {
      if (err) { return next(err) };
      if (!dbUserObj) {
        var err = new Error('Invalid credentials')
        err.status = 401
        return next(err)
      };
      res.json(genToken(dbUserObj))
    })
  }
  , validate : function (username, password, next) {
    // find user in db with username
    User.findOne( { username : username }
      , function (err, user) {
        if (err) { return next(err) };
        // now use password and user's salt to generate their hash
        pass.hash(password, user.salt, function (err, hash) {
          // if the stored hash == the generated hash we have a match
          if (user.hash == hash) {
            next(false, user)
          } else {
            var err = new Error('Invalid credentials')
            err.status = 401
            return next(err)
          };
        })
      })
  }
  , validateUser : function (username, next) {
    User.findOne( { username : username }, function (err, user) {
      if (err) { return next(err) };
      return next(false, user)
    })
  }
  , signup : function (req, res, next) {
    // function to create a new user 
    // needs implementation
    // return a status 501 - Not Implemented
    var err = new Error('Not Implemented')
    err.status = 501
    return next(err)
  }
}

// private methods
function genToken (user) {
  // set expiration for 7 days out
  var expires = expiresIn(7)
  // need to move secret into seperate config
  var token = jwt.sign( { exp : expires
                        , iss : 'http://localhost'
                        , aud : 'soundtrack'
                        , sub : user.username
                        }, 'pandaistheperfectpuppybutilovelucytoo')
  return { token : token
         , expires : expires
         , user : user
         }
}

function expiresIn (numDays) {
  var dateObj = new Date()
  return dateObj.setDate(dateObj.getDate() + numDays)
}

module.exports = auth