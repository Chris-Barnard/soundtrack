var jwt = require('jsonwebtoken')
var validateUser = require('../routes/auth').validateUser

module.exports = function(req, res, next) {
	// code taken from web resource to grab token info from various
	// spots it may be contained
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
 
  if (token || key) {
    jwt.verify(token, 'pandaistheperfectpuppybutilovelucytoo', function (err, decoded) {
      if (err) { return next(err) };
      // Is token expired? This should be caught by jwt.verify function and reflected in err
      if (decoded.exp <= Date.now()) {
        var err = new Error('Token Expired')
        err.status = 400
        return next(err)
      };

      // does the key match the subject of the token?
      if (decoded.sub !== key) {
        var err = new Error('Token not issued for this key')
        err.status = 400
        return next(err)
      };

      // check user authorization levels
      // the key would be the logged in user's username
      validateUser(key, function (err, dbUser) {
        if (err) { return next(err) };
        // no user matching key in db
        if (!dbUser) {
          var err = new Error('Invalid User')
          err.status = 401
            return next(err)
        };

        // save the current user id into req.userId
        req.userId = dbUser.id

        // is the request to the admin section and does user have admin rights?
        // or is request not to admin but still to the correct api path
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin')
          || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          // move on to next middleware
          if (req.url.indexOf('self') >= 0) {
            req.self = dbUser.id
          };
          return next()
        } else {
          var err = new Error('Not Authorized')
          err.status = 403
          return next(err)
        };
      }) 
    })
  } else {
    var err = new Error('Invalid Token or Key')
    err.status = 401
    return next(err)
  };
}