var express = require('express');
var router = express.Router();

let labsCtrl = require('../controllers/labs')

router.get('/', labsCtrl.index)
router.post('/wasteVolCalc', labsCtrl.wasteVolCalc)
router.get('/new', labsCtrl.new)
router.get('/:id', labsCtrl.show)
router.post('/:id', labsCtrl.create)
router.delete('/:id', labsCtrl.delete)
router.get('/:id/edit', labsCtrl.edit)
router.put('/:id', labsCtrl.update)


module.exports = router;