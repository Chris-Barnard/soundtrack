var express = require('express')
var router = express.Router();

var webapp = {
	indexPage : function (req, res, next) {
    res.render('index', { title : 'Soundtrack For Your Life'})
  }
}

module.exports = webapp