var express = require('express')
var router = express.Router()

/* Mongoose models */
var mongoose = require('mongoose')
var Message = mongoose.model('Message')


/* Functions for GET Requests */
/******************************/

/* GET /msgs - Return all messages */
router.get('/', function (req, res, next) {
  Message.find(function (err, messages) {
    if (err) { return next(err) };
    res.json(messages)
  })
})

/* GET /msgs/:id - Return requested message matching on Id */
/* First define param :msg */
router.param('msg', function (req, res, next, id) {
  var query = Message.findById(id)

  /* Pull relevant message from db and save as req.message */
  query.exec(function (err, message) {
    if (err) { return next(err) };
    if (!message) { return next(new Error("Cannot find " + id) ) };
    req.message = message
    return next()
  })
})
/* Next pass on req.message as a JSON response */
router.get('/:msg', function (req, res, next) {
  res.json(req.message)
})

/* Functions for POST Requests */
/*******************************/

/* POST /msgs - Add attached message to db as new entry */
router.post('/', function (req, res, next) {
  var message = new Message(req.body)

  message.save(function (err, message) {
    if (err) { return next(err) };
    res.json(message)
  })
})


module.exports = router