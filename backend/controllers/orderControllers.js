const {Order} = require('../models/orderModels');

const order = async(req, res)=>{
    const {items, userId, totalAmount} = req.body;
    try{
        const orderId = "ORD" + Date.now(); 

        const newOrder =  await Order.create({
            items, userId, totalAmount, orderId
        })

        res.status(200).json({msg:'Order created',newOrder})
    }catch(err){
        console.log("Error from backend", err.message);
        res.status(400).json({msg:'Internal Server Error'})
    }
}

module.exports = order;