import { STATUS_CODES } from "../constants/constants.js";
import Music from "../models/music.js";
import User from "../models/User.js";

// ✅ Upload Music
export const serviceuploadMusic = async (data) => {

    const { title, duration, genre, bpm, mood, price, audio, sellerID, tags, image } = data;


    const newMusic = new Music({ title, duration, genre, bpm, mood, price, audio, sellerID, tags, image });
    await newMusic.save();
     return newMusic;

};
//  return new HttpError("Invoice not found",STATUS_CODES.NOT_FOUND);
export const servicegetAllMusic = async () => {

    const music = await Music.find({ downloadable: { $ne: true } })
      .sort({ createdAt: -1 })
      .select('_id title genre bpm mood duration tags image price sellerID');
 
    // Fetch all seller details in parallel
    const sellerIds = music.map(track => track.sellerID);
    const sellers = await User.find({ _id: { $in: sellerIds } }).select('_id name');

    // Convert seller array into a lookup object for quick access
    const sellerMap = sellers.reduce((acc, seller) => {
      acc[seller._id] = seller.name;
      return acc;
    }, {});

    // Attach sellerName to each track
    const populatedMusic = music.map(track => ({
      ...track.toObject(),
      sellerName: sellerMap[track.sellerID] || '' // Default to empty string if seller not found
    }));
 
    return populatedMusic;
 
};


// ✅ Get Audio By ID
export const servicegetAudio = async (id) => {

    const songID = id;

    if (!songID) {

      return new HttpError("Track ID is required",STATUS_CODES.BAD_REQUEST);
    }

    const song = await Music.findById(songID).select("audio");

    if (!song) {
      
      return new HttpError("Song not found",STATUS_CODES.NOT_FOUND);
    }
     return song;
    
};
// ✅ Get Music By User ID with specific fields
export const servicegetMusicById = async (id) => {
 
    const  userId  = id;
   
    // Find music documents with specific fields only
    const musics = await Music.find(
      { sellerID: userId },
      { 
        _id: 1, 
        title: 1, 
        genre: 1, 
        bpm: 1, 
        duration: 1 ,
        downloadable: 1,
        image:1,
      }
    );

    if (!musics || musics.length === 0) {
  
      return new HttpError("No music found for this user",STATUS_CODES.NOT_FOUND);
    }
      
    res.status(STATUS_CODES.OK).json({ 
      success: true, 
      data: musics,
      count: musics.length 
    });

};

// ✅ Update Music By ID
export const serviceupdateMusic = async (idp,useridb) => {

    const id  = idp;
    const userID = useridb;

    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { downloadable: true, userID },
      { new: true }
    );

    if (!updatedMusic) {
   
      return new HttpError("No music found",STATUS_CODES.NOT_FOUND);
    }
    return updatedMusic;
    

};

// ✅ Delete Music By ID
export const servicedeleteMusic = async (idp) => {
 
  
  
    const  id  = idp;
    
    const music = await Music.findByIdAndDelete(id);

    if (!music) {
        return new HttpError("No music found",STATUS_CODES.NOT_FOUND);
    }

    

};
