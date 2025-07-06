const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getLogs } = require('../controllers/logController');

router.get('/', auth, getLogs);

module.exports = router;
