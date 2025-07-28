const {Cart} = require('../models/cartModels');


//AddCart
const addcart = async(req, res)=>{
    const { userId, productId, title, image, price, quantity} = req.body;

    try{
     //this will check if the product is already in cart , so dont add it again as new item 
    //just increase the quantity by 1, save it back to database
        const existing = await Cart.findOne({userId, productId});
        if(existing){
            existing.quantity = existing.quantity + 1;
             await existing.save();
             return res.json(existing); // sending data to Frontend
        }
        const newCartItem = new Cart({
            userId, productId, image, title, price , quantity : 1
        });
             
        await newCartItem.save();
        res.status(201).json(newCartItem);     
    } catch(e){
         console.log("Error adding to cart:", e.message);
         res.status(500).json({msg:"Error Adding to Cart"});
    }
};


//this is required to check cart with userId to update in that cart
const userCart = async(req, res)=>{
    const {userId} = req.params;
    try{
       const cart = await Cart.find({userId});
       res.json(cart);
    }catch(e){
       console.log("Error fetching Cart,e.message");
    }
}


const deleteFromCart = async(req, res)=>{
    const {productId} = req.params;
    console.log("hit")
    try{
        const cartItem = await Cart.findById(productId);
        if(cartItem.quantity > 1){
            cartItem.quantity -= 1;
            cartItem.save();
            res.json(cartItem);
        }
        else{
          await Cart.findByIdAndDelete(productId);
          res.json({msg:'Item deleted From Cart'})
        }
         
    }catch(e){
        console.log("Error deleting Cart", e.message);
    }
}


const deleteAllItemFromCart= async(req, res)=>{
    const {userId} = req.params;
    try{
        const Item = await Cart.deleteMany({userId});
        res.status(200).json({msg:'Cart items deleted'});
    }catch(e){
        res.status(400).json({msg:'Internal server error in deleting all items from cart', error: e.message});
    }
}


module.exports = {addcart, userCart, deleteFromCart, deleteAllItemFromCart};