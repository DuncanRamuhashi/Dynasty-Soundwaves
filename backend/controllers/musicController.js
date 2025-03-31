import Music from "../models/music.js";
import User from "../models/User.js";
import { STATUS_CODES } from "../constants/constants.js";
import asyncHandler from 'express-async-handler';
import { servicedeleteMusic, servicegetAllMusic, servicegetAudio, servicegetMusicById, serviceupdateMusic, serviceuploadMusic } from "../services/musicService.js";

export const uploadMusic =asyncHandler( async (req, res) => {

    const newMusic =await serviceuploadMusic(req.body);
    await newMusic.save();

    res.status(STATUS_CODES.CREATED).json({ success: true, message: "Music uploaded successfully", data: newMusic });

});

export const getAllMusic =asyncHandler( async (req, res) => {

    const populatedMusic = await servicegetAllMusic();

    res.status(STATUS_CODES.OK).json({ success: true, data: populatedMusic });
});



export const getAudio =asyncHandler( async (req, res) => {

    const songID = req.params.track;

    const song = await servicegetAudio(songID);


    res.status(STATUS_CODES.OK).json({ success: true, data: song });

});

export const getMusicById =asyncHandler( async (req, res) => {
 
    const  userId  = req.params.id;
   
  const musics =   await servicegetMusicById(userId);
  res.status(STATUS_CODES.OK).json({ 
    success: true, 
    data: musics,
    count: musics.length 
  });
});


export const updateMusic =asyncHandler( async (req, res) => {

    const { id } = req.params;
    const { userID } = req.body;

    const updatedMusic =await serviceupdateMusic(id,userID);

    res.status(STATUS_CODES.OK).json({ success: true, message: "Music is now downloadable", data: updatedMusic });

});

export const deleteMusic =asyncHandler( async (req, res) => {

    const { id } = req.params;
    
    await servicedeleteMusic(id);
    res.status(STATUS_CODES.OK).json({ success: true, message: "Music deleted successfully" });

});
