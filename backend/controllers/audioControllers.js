const {Audio} = require('../models/audioModels');

const createAudio = async(req, res)=>{
    const {title, scripture, audioUrl} = req.body;
    try{
        const audio = await Audio.create({title, scripture, audioUrl});
         res.status(201).json({msg:'Audio created', audio});
    }catch(e){
         res.status(400).json({msg:'Something went wrong', error:e.message});
    } 
}


const fetchAudio=async(req, res)=>{
    try{
        const audio = await Audio.find({ })
         res.status(200).json({msg:'Fetched audio',audio});
    }catch(e){
         res.status(400).json({msg:'somethingn went wrong fetching audio', error: e.message });
    }
}

module.exports={
    createAudio, fetchAudio
}