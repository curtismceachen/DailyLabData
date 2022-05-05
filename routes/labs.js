var express = require('express');
var router = express.Router();

let labsCtrl = require('../controllers/labs')

router.get('/', labsCtrl.index)
router.get('/new', labsCtrl.new)
router.get('/:id', labsCtrl.show)
router.post('/:id', labsCtrl.create)


module.exports = router;