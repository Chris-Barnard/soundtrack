var express = require('express')
var router = express.Router()

/* Mongoose models */
var mongoose = require('mongoose')
var Message = mongoose.model('Message')

/* Functions for Parameter Parsing */
/***********************************/
/* These are executed before the following routes */
/* and passed on via the next callback functions*/

/* Define PARAM :msg */
router.param('msg', function (req, res, next, id) {
  /* Pull relevant message from db and save as req.message */
  Message.findById(id, function (err, message) {
    if (err) { return next(err) };
    if (!message) { return next(new Error("Cannot find " + id) ) };
    req.message = message
    return next()
  })
})

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
/* First routed through param function above which setups up req.message */
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

/* Functions for PUT Requests */
/******************************/

/* PUT /msgs/:msg - Update message at ID with the attached message */
/* First routed through param function above which setups up req.message */
router.put('/:msg', function (req, res, next) {
  Message.findByIdAndUpdate(req.message.id, req.body, function (err, message) {
    if (err) { return next(err) };
    if (!message) { 
      return next(new Error("Could not find message to update at "
        + req.message.id))
    };
    res.json(message)
  })
})

/* Functions for DELETE Requests */
/*********************************/

/* DELETE /msgs/:msg - Delete message at ID */
/* First routed through param function above which setups up req.message */
router.delete('/:msg', function (req, res, next) {
  Message.findByIdAndRemove(req.message.id, function (err, message) {
    if (err) { return next(err) };
    if (!message) {
      return next(new Error('Could not find message to delete at '
        + req.message.id))
    };
    res.json(message)
  })
})

module.exports = router