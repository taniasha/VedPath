//we create mongodb schema here
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
});

const loginSchema = new mongoose.Schema({
    name:{type: String, required: true},
    password:{type: String, required: true}
})

const bookSchema = new mongoose.Schema({
    title: {required:true, type:String },
    image: {required: true, type:String},
    price: {required: true, type: Number}
})

const trendingSchema = new mongoose.Schema({
    title:{required: true, type: String},
    image: {required: true, type:String},
    price: {required: true, type: Number},
    author: {required: true, type:String},
    rating: {required: true, type: Number}
})

module.exports={
    User:  mongoose.model('User', userSchema), // it will create 'user' schema in mongodb
    Login: mongoose.model('Login', loginSchema),
    Book: mongoose.model('Book', bookSchema),
    Trending: mongoose.model('Trending',trendingSchema)
} 