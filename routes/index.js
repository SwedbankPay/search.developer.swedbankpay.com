var Express = require('express');
var router = Express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Simple elastic search client'
  });
});

exports.indexRouter = router;