var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Audio Experiments', song: 'Duke Dumont - Ocean Drive' });
});

module.exports = router;
