const express = require('express');
const router = express.Router();
const {addBooks, getBooks, displayBook} =  require('../controllers/bookControllers');
const {addtrending, showtrending, displaytrending} = require('../controllers/trendingControllers');
const verifyToken = require('../middleware/verifyToken');
const {addcart, userCart, deleteFromCart, deleteAllItemFromCart} = require('../controllers/cartControllers');
const {toggleWishlist, userWishlist} = require('../controllers/wishlistControllers');
const order = require('../controllers/orderControllers');

// post - data bhejna ho ..from frontend to db 
// get - data fetch krna ho ... example display krvana ko data db se frontend mein

//Books
router.post('/addbooks',  addBooks);
router.get('/getbooks',  getBooks);
router.get('/book/:id',  displayBook);

//trending
router.post('/addtrending', addtrending);
router.get('/showtrending', showtrending);
router.get('/trending/:id', displaytrending);

//cart
router.post('/addtocart',addcart);
router.get("/usercart/:userId", userCart);
router.delete("/delete/:productId", deleteFromCart);
router.delete("/delete-cart-items/:userId",deleteAllItemFromCart);

//wishlist
router.post('/togglewishlist', toggleWishlist);
router.get('/userwishlist/:userId', userWishlist);

//Order
router.post('/add-order', order);

module.exports = router;