const {Wishlist} = require('../models/wishlistModels');
const {Book} = require('../models/models');

const toggleWishlist = async (req, res) => {
  // console.log("hit wishmklmk");
  const { productId, userId, title, author, image, price } = req.body;

  try {
    const existing = await Wishlist.findOne({ productId, userId });
    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return res.status(200).json({ msg: "Removed from wishlist" });
    } else {
      await Wishlist.create({ productId, userId, title, author, image, price });
      return res.status(201).json({ msg: "Added to wishlist" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


//user ka wishlist
const userWishlist = async(req, res)=>{
    // const {productId, userId, title, author, image, price} = req.body;
    const {userId} = req.params;
    try{
        const data = await Wishlist.find({userId});
        if(data){
           return res.status(200).json({msg:"WIshlist page", data});
        }
          return res.status(400).json({msg:"No item in wishlist"})
        
    }catch(e){
          console.log("error",e.message);
           return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { toggleWishlist, userWishlist};