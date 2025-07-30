const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    scripture:{
        type: String,
        required: true,
    },
    audioUrl :{
        type: String,
        required: true,
    },
})

module.exports = {
     Audio : mongoose.model("Audio",audioSchema),
}