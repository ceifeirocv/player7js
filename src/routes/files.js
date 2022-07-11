const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const fileController = require('../controllers/FileController');

const upload = multer(multerConfig);

const router = Router();

router.post('/product', upload.single('file'), fileController.productImageStorage);

module.exports = router;
