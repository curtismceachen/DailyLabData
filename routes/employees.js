var router = require('express').Router();
//var router = express.Router();
var employeesCtrl = require('../controllers/employees');
//var labsCtrl = require()

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

router.get('/', employeesCtrl.index)
router.post('/', employeesCtrl.create)

//function isLoggedIn(req, res, next) {
  //if (req.isAuthenticated()) return next();
  //res.redirect('/auth/google')
//}

module.exports = router;
