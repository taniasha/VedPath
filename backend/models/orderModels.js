const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{type:String},
    orderId : {type: String},
    name: {type: String},
    totalAmount : {type: Number},
    items: [
         {
            productId: {type: String},
            title:  {type: String},
            quantity:  {type: Number},
        }
    ]
})

module.exports = {
    Order: mongoose.model('Order', orderSchema)
}