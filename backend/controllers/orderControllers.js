const {Order} = require('../models/orderModels');

const order = async(req, res)=>{
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body); 

    const {items, userId, totalAmount, paymentStatus="pending"} = req.body;
    try{
        const orderId = "ORD" + Date.now(); 

        const newOrder =  await Order.create({
            items, userId, totalAmount, orderId, paymentStatus
        })

        res.status(200).json({msg:'Order created',newOrder})
    }catch(err){
        console.log("Error from backend", err.message);
        res.status(400).json({msg:'Internal Server Error'})
    }
}



// const { Order } = require("../models/orderModels");

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const updated = await Order.findOneAndUpdate(
      { orderId },
      {
        paymentStatus: "paid",
        paymentId,
        paidAt: new Date()
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({
      msg: "Payment updated successfully",
      updatedOrder: updated
    });

  } catch (err) {
    res.status(500).json({
      msg: "Error verifying payment",
      error: err.message
    });
  }
};



module.exports ={ order, verifyPayment };