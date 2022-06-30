const { Router } = require('express');
const SessionController = require('../controllers/SessionController');

const router = Router();

router.post('/', SessionController.store);

module.exports = router;
