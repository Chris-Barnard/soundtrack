var mongoose = require('mongoose')
var Message = mongoose.model('Message')
var User = mongoose.model('User')

var msgs = {
  getAll : function (req, res, next) {
    Message.find(function (err, messages) {
      if (err) { return next(err) };
      if (!messages) { return next(new Error('No messages found')) };
      res.json(messages)
    })
  }
  , getOne : function (req, res, next) {
    var id = req.params.id
    Message.findById(id, function (err, message) {
      if (err) {return next(err) };
      if (!message) { return next(new Error("Cannot find msg: " + id)) };
      res.json(message)
    })
  }
  // function to return the messages by users in their follows array
  // at some point will need to probably filter this and others through a
  // pagination mechanism
  , getFeed : function (req, res, next) {
    var id = req.params.id || req.self
    // start by grabbing the requested user model
    User.findById(id, function (err, user) {
      if (err) { return next(err) };
      if (!user) { return next(new Error('Cannot find user: ' + id)) };
      // next find every message that has a sender field in the user.follows array
      var query = Message.find({ sender : { $in : user.follows } }).sort({ dateReceived : -1 })
      query.exec(function (err, messages) {
        if (err) { return next(err) };
        // return the messages found
        res.json(messages)
      })
    })
  }
  // get the recent messages sent by user
  , getRecentForUser : function (req, res, next) {
    var id = req.params.id || req.self
    var query = Message.find({ sender : id }).sort({ dateReceived : -1 }).limit(20)
    query.exec(function (err, messages) {
      if (err) { return next(err) };
      if (!messages) { return next(new Error('No messages found for user ' + id)) };
      res.json(messages)
    })
  }
  // create a new message on the server
  , create : function (req, res, next) {
    var newMsg = new Message(req.body)

    // set the sender to the logged in user making the request
    newMsg.sender = req.userId
    // save the message to the DB
    newMsg.save(function (err, message) {
      if (err) { return next(err) };
      res.json(message)
    })
  }
  , update : function (req, res, next) {
    var updateMsg = req.body
    var id = req.params.id

    Message.findByIdAndUpdate(id, updateMsg, function (err, message) {
      if (err) { return next(err) };
      if (!message) { next(new Error('Cannot find msg: ' + id)) };
      res.json(message)
    })
  }
  , delete : function (req, res, next) {
    var id = req.params.id

    Message.findByIdAndRemove(id, function (err, message) {
      if (err) { return next(err) };
      if (!message) {return next(new Error('Cannot find msg: ' + id)) };
      res.json(true)
    })
  }
}

module.exports = msgs