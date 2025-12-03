const express = require('express');
const router = express.Router();
const {order, verifyPayment} = require('../controllers/orderControllers');
const { getOrderHistory } = require('../controllers/historyController');
const verifyToken = require('../middleware/verifyToken');


router.post("/verify-payment", verifyToken, verifyPayment);
router.post('/add-order',verifyToken, order);
router.get('/my-orders', verifyToken, getOrderHistory);

module.exports = router;