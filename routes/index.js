var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  res.send('API up and running')
  /* Old render page useing handlebars files in ./views/ */
  // res.render('index', { title: 'Express' });

});

module.exports = router;
