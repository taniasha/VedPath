const express = require('express');
const { GetAllOrders } = require('../controllers/adminControllers');
const router = express.Router();

router.get('/order-data',GetAllOrders);

module.exports = router;