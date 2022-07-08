const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const router = Router();

router.get('/', ProductController.get);
router.post('/', ProductController.store);
router.put('/', ProductController.update);

module.exports = router;
