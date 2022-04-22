const express = require('express');
const router = express.Router();

const quote_controller = require('../controllers/quote');

router.get('/getAll', quote_controller.getAll);
router.get('/getOne/:id', quote_controller.getOne);
router.post('/add', quote_controller.add);
router.post('/update', quote_controller.update);
router.get('/delete/:id', quote_controller.deleteQuote);

module.exports = router;