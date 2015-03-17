var express = require('express');
var router = express.Router();

var auth = require('./auth.js')
var msgs = require('./msgs.js')
var users = require('./users.js')
var webapp = require('./webapp.js')

/*************************************
 * API Access Points
 *************************************/

// routes that anyone can access
router.post('/login', auth.login)
router.post('/signup', auth.signup)

// message routes that can only be accessed by authenticated users
router.get('/api/v1/msgs', msgs.getAll)
router.get('/api/v1/msgs/:id', msgs.getOne)
router.post('/api/v1/msgs', msgs.create)
router.put('/api/v1/msgs/:id', msgs.update)
router.delete('/api/v1/msgs/:id', msgs.delete)


// user routes that can be accessed by authenticated users
// users
router.get('/api/v1/users/self', users.getOne)
router.get('/api/v1/users/:id', users.getOne)
router.get('/api/v1/users/self/msgs', msgs.getRecentForUser)
router.get('/api/v1/users/:id/msgs', msgs.getRecentForUser)
router.get('/api/v1/users/self/feed', msgs.getFeed)


// relationships
router.get('/api/v1/users/self/follows', users.getOneFollows)
router.get('/api/v1/users/:id/follows', users.getOneFollows)
router.post('/api/v1/users/self/follows', users.adjFollows)


// routes that can only be accessed by authenticated & authorized user
// Authentication criteria user.role = 'admin'
router.get('/api/v1/admin/users', users.getAll)
router.get('/api/v1/admin/users/:id', users.getOne)
router.post('/api/v1/admin/users', users.create)
router.put('/api/v1/admin/users/:id', users.update)
router.delete('/api/v1/admin/users/:id', users.delete)

/*************************************
 * WebApp Rendering
 *************************************/
router.get('/*', webapp.indexPage)

module.exports = router;
