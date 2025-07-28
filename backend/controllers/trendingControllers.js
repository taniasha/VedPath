const {Trending} = require('../models/models');

//Add/store trending books  to the database
const addtrending = async(req, res)=>{
    const {title, author, image, rating, price} = req.body;
    try{
       const trending = await new Trending({title, author, image, rating, price});
       await trending.save();

       res.status(201).json({msg: "Book added successfully"});
    }catch(e){
        console.log("Error in trending:",e.message);
    }
}


// to fetch all trending books from database
const showtrending = async (req, res) => {
  try {
    const trending = await Trending.find({}); // fetch all trending items
    res.status(200).json(trending);
  } catch (e) {
    console.error("Server error in showtrending:", e.message);
    res.status(500).json({ error: "Server error while fetching trending items" });
  }
};


// to show particular trending book on which user clicks we gonna use params
const displaytrending = async(req, res)=>{
   try{
       const {id} = req.params;
       const book = await Trending.findById(id);

       if(!book) return res.status(400).json({msg:'Book Not Found'});
       res.json(book); // send data to fronteend
   }catch(e){
       console.log("Error finidng trending book", e.message);
   }
}

module.exports = {addtrending, showtrending, displaytrending};