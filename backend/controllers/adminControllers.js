const {Order} = require('../models/orderModels');

const GetAllOrders = async(req, res)=>{
    try{
        const orderData = await Order.find({});
        res.status(200).json({msg:'Order Show successfully',orderData});
    }catch(e){
        res.status(400).json({msg:'Something went wrong while showing order'});
        console.log("Something went wrong while showing order");
    }
}
module.exports={
    GetAllOrders
}