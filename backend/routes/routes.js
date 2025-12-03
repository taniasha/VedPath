const express = require('express');
const router = express.Router();
const { getBooks, displayBook} =  require('../controllers/bookControllers');
const {showtrending, displaytrending} = require('../controllers/trendingControllers');
const verifyToken = require('../middleware/verifyToken');
const {addcart, userCart, deleteFromCart, deleteAllItemFromCart} = require('../controllers/cartControllers');
const {toggleWishlist, userWishlist} = require('../controllers/wishlistControllers');
// const {order, verifyPayment} = require('../controllers/orderControllers');
const {  fetchAudio } = require('../controllers/audioControllers');
// const { getOrderHistory } = require('../controllers/historyController');


// post - data bhejna ho ..from frontend to db 
// get - data fetch krna ho ... example display krvana ko data db se frontend mein

//Books
router.get('/getbooks',  getBooks);
router.get('/book/:id',   displayBook);

//trending
router.get('/showtrending', showtrending);
router.get('/trending/:id', displaytrending);

//cart
router.post('/addtocart', verifyToken, addcart);
router.get("/usercart/:userId",verifyToken, userCart);
router.delete("/delete/:productId",verifyToken, deleteFromCart);
router.delete("/delete-cart-items/:userId",verifyToken, deleteAllItemFromCart);

//wishlist
router.post('/togglewishlist',verifyToken, toggleWishlist);
router.get('/userwishlist/:userId',verifyToken, userWishlist);

//Order
// router.post('/add-order',verifyToken, order);

//Audio
router.get('/fetch-audio', fetchAudio);


// router.post("/verify-payment", verifyToken, verifyPayment);

// router.get('/my-orders', verifyToken, getOrderHistory);


module.exports = router;