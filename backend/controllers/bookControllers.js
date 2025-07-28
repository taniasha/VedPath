const {Book} = require("../models/models");


//addBooks to database
const addBooks = async (req, res) => {
  // console.log("📕 book controller hit");
  const { title, image, price } = req.body;
  try {
    const newBook = new Book({ title, image, price }); //Book is my schema
    await newBook.save();

    res.status(201).json({ msg: "book added successfully" });
  } catch (e) {
    console.log("Error adding book: ", e.message);
  }
};


//to display allthe books from the database
const getBooks = async(req, res)=>{
    try{
        const books = await Book.find(); // fetch all the books from the Book schema 
        res.json(books);
    }catch(e){
        res.status(500).json({error: e.message})
    }
}


// to display that particular book on which we click
const displayBook = async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);

        if(!book) { return res.status(400).json({msg:'Book Not Found'}) }
         return res.json(book); //else send book data
    } catch(e){
        console.log("Error diplaying Books:",e);
        return res.status(500).json({ msg: "Server Error" });
    }
}


module.exports = { addBooks, getBooks, displayBook };
