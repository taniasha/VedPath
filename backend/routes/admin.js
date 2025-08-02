const express = require('express');
const { GetAllOrders, GetAllUsers } = require('../controllers/adminControllers');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { addBooks } = require('../controllers/bookControllers');
const { addtrending } = require('../controllers/trendingControllers');
const { createAudio } = require('../controllers/audioControllers');
const router = express.Router();


router.post('/addbooks', verifyToken, verifyAdmin, addBooks);

router.post('/addtrending', verifyToken, verifyAdmin, addtrending);

router.post('/create-audio',verifyToken,verifyAdmin, createAudio);

router.get('/order-data', verifyToken,verifyAdmin, GetAllOrders);

router.get('/user-data', verifyToken,verifyAdmin, GetAllUsers);


module.exports = router;