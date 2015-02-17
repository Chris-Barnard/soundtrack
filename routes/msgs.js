var mongoose = require('mongoose')
var Message = mongoose.model('Message')

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
  , create : function (req, res, next) {
    var newMsg = new Message(req.body)

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