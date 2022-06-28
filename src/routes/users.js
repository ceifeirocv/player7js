const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.get('/', (req, res) => {
  res.send('users');
});
router.post('/', (req, res) => {
  const id = uuidv4();
  res.send(id);
});

module.exports = router;
