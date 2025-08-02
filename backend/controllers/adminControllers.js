const {Order} = require('../models/orderModels');
const {User} = require('../models/models');

// Order tracking
const GetAllOrders = async(req, res)=>{
     console.log("📦 Admin Orders Fetch Hit");
    try{
        const orderData = await Order.find({});
        res.status(200).json({msg:'Order Show successfully',orderData});
    }catch(e){
        res.status(400).json({msg:'Something went wrong while showing order'});
        console.log("Something went wrong while showing order");
    }
}


// Sign up users tracking
const GetAllUsers = async(req, res)=>{
   try{
       const users = await User.find({});
       res.status(200).json({msg:'Get All signuped users successfully',users});
   }catch(e){
        res.status(400).json({msg:'Something went wrong',error: e.message});
   }
}


module.exports={
    GetAllOrders, GetAllUsers
}