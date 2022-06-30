const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.store);

module.exports = router;
