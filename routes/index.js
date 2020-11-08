const express = require('express');

const router = express.Router();
const checkLimit = require('../middlewares/rate_limiter');
const { handleBusinessLogic } = require('../controllers/index');
/* GET home page. */
router.get('/', checkLimit, handleBusinessLogic);

module.exports = router;
