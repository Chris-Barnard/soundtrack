var pass = require('pwd')
var mongoose = require('mongoose')
var User = mongoose.model('User')

var users = {
	getAll : function (req, res, next) {
		User.find(function (err, users) {
			if (err) { return next(err) };
      if (!users) { return next(new Error('No users exist')) };
      res.json(users)
		})
	}
  , getOne : function (req, res, next) {
    var id = req.params.id

    User.findById(id, function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('Cannot find user: ' + id)) };
      res.json(user)
    })
  }
  , create : function (req, res, next) {
    var newUser = new User(req.body)

    pass.hash(req.body.password, function (err, salt, hash) {
      newUser.salt = salt
      newUser.hash = hash
      newUser.save(function (err, user) {
        if (err) { return next(err) };
        res.json(user)
      })
    })
  }
  , update : function (req, res, next) {
    var updateUser = req.body
    var id = req.params.id

    User.findByIdAndUpdate(id, updateUser, function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('Cannot find user: ' + id)) };
      res.json(user)
    })
  }
  , delete : function (req, res, next) {
    var id = req.params.id

    User.findByIdAndDelete(id, function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('Cannot find user: ' + id)) };
      res.json(true)
    })
  }
}

module.exports = users