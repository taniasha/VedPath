const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    productId:{ type: String},
    title: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1}
})

module.exports = {
    Cart : mongoose.model("Cart", cartSchema)
}
