var express = require('express');
var router = express.Router();

var auth = require('./auth.js')
var msgs = require('./msgs.js')
var users = require('./users.js')

// routes that anyone can access
router.post('/login', auth.login)
router.post('/signup', auth.signup)

// routes that can only be accessed by authenticated users
router.get('/api/v1/msgs', msgs.getAll)
router.get('/api/v1/msg/:id', msgs.getOne)
router.post('/api/v1/msg', msgs.create)
router.put('/api/v1/msg/:id', msgs.update)
router.delete('/api/v1/msg/:id', msgs.delete)

// routes that can only be accessed by authenticated & authorized users
router.get('/api/v1/admin/users', users.getAll)
router.get('/api/v1/admin/user/:id', users.getOne)
router.post('/api/v1/admin/user', users.create)
router.put('/api/v1/admin/user/:id', users.update)
router.delete('/api/v1/admin/user/:id', users.delete)

module.exports = router;