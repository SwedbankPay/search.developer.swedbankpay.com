var Express = require('express');
var router = Express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
})

exports.index = router