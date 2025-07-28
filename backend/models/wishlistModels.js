const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productId: {type: String, required: true},
    title : {type: String},
    price : {type: Number},
    author : {type:String},
    image : {type: String},
     userId: { type: String, required: true }, 
})

module.exports = {
    Wishlist : mongoose.model("Wishlist", wishlistSchema),
}