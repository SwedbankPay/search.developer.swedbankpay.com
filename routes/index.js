import Express from 'express';
var router = Express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Simple elastic search client'
  });
});

export default router;