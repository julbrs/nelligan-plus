var express = require('express');
var router = express.Router();

// API subfolder
router.use('/api', require('./api'));
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// router.get('/page2', function(req, res, next) {
//   res.render('index', { title: 'toto' });
// });

module.exports = router;
