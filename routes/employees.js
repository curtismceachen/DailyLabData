var router = require('express').Router();
var employeesCtrl = require('../controllers/employees');



router.get('/', employeesCtrl.index)
router.post('/', employeesCtrl.create)


module.exports = router;
