import Music from "../models/music.js";
import User from "../models/User.js";
import { STATUS_CODES } from "../constants/constants.js";
import asyncHandler from 'express-async-handler';
import { servicedeleteMusic, servicegetAllMusic, servicegetAudio, servicegetMusicById, serviceupdateMusic, serviceuploadMusic } from "../services/musicService.js";

export const uploadMusic =asyncHandler( async (req, res) => {

    const newMusic = serviceuploadMusic(req.body);
    await newMusic.save();

    res.status(STATUS_CODES.CREATED).json({ success: true, message: "Music uploaded successfully", data: newMusic });

});

export const getAllMusic =asyncHandler( async (req, res) => {

    const populatedMusic = await servicegetAllMusic();
  console.log(populatedMusic);
    res.status(STATUS_CODES.OK).json({ success: true, data: populatedMusic });
});



export const getAudio =asyncHandler( async (req, res) => {

    const songID = req.params.track;

    const song = servicegetAudio(songID);


    res.status(STATUS_CODES.OK).json({ success: true, data: song });

});

export const getMusicById =asyncHandler( async (req, res) => {
 
    const  userId  = req.params.id;
   
    servicegetMusicById(userId);

});


export const updateMusic =asyncHandler( async (req, res) => {

    const { id } = req.params;
    const { userID } = req.body;

    const updatedMusic = serviceupdateMusic(id,userID);

    res.status(STATUS_CODES.OK).json({ success: true, message: "Music is now downloadable", data: updatedMusic });

});

export const deleteMusic =asyncHandler( async (req, res) => {

    const { id } = req.params;
    
    servicedeleteMusic(id);
    res.status(STATUS_CODES.OK).json({ success: true, message: "Music deleted successfully" });

});
