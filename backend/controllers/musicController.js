import Music from "../models/music.js";
import User from "../models/User.js";
// ✅ Upload Music
export const uploadMusic = async (req, res) => {
  try {
    const { title, duration, genre, bpm, mood, price, audio, sellerID, tags, image } = req.body;

    // Validate required fields
    if (!title || !duration || !genre || !bpm || !mood || !price || !audio || !sellerID || !tags || !image) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const newMusic = new Music({ title, duration, genre, bpm, mood, price, audio, sellerID, tags, image });
    await newMusic.save();

    res.status(201).json({ success: true, message: "Music uploaded successfully", data: newMusic });
  } catch (error) {
    console.error("Upload Music Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllMusic = async (req, res) => {
  try {
    const music = await Music.find({ downloadable: { $ne: true } })
      .sort({ createdAt: -1 }) // Sort by createdAt descending (newest first)
      .select('_id title genre bpm mood duration tags image price sellerID');

    const populatedMusic = []; // To store music with seller names

    // Use a for loop to iterate through the music array
    for (let i = 0; i < music.length; i++) {
      const track = music[i];

      // Find the user by sellerID
      const user = await User.findById(track.sellerID);

      // Add the seller name to the track object
      populatedMusic.push({
        ...track.toObject(), // Convert track to plain object
        sellerName: user ? user.name : '' // Add the seller name or empty string if no user
      });
    }

    // Send the response with the populated music data
    res.status(200).json({ success: true, data: populatedMusic });
  } catch (error) {
    console.error("Get All Music Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ✅ Get Audio By ID
export const getAudio = async (req, res) => {
  try {
    const songID = req.params.track;

    if (!songID) {
      return res.status(400).json({ success: false, message: "Track ID is required" });
    }

    const song = await Music.findById(songID).select("audio");

    if (!song) {
      return res.status(404).json({ success: false, message: "Song not found" });
    }

    res.status(200).json({ success: true, data: song });
  } catch (error) {
    console.error("Get Audio Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
// ✅ Get Music By User ID with specific fields
export const getMusicById = async (req, res) => {
  try {
    const  userId  = req.params.id;
   
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
      return res.status(404).json({ 
        success: false, 
        message: "No music found for this user" 
      });
    }
  
    res.status(200).json({ 
      success: true, 
      data: musics,
      count: musics.length 
    });
  } catch (error) {
    console.error("Get Music By User ID Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error" 
    });
  }
};

// ✅ Update Music By ID
export const updateMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID } = req.body;

    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { downloadable: true, userID },
      { new: true }
    );

    if (!updatedMusic) {
      return res.status(404).json({ success: false, message: "Music not found" });
    }

    res.status(200).json({ success: true, message: "Music is now downloadable", data: updatedMusic });
  } catch (error) {
    console.error("Update Music Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Music By ID
export const deleteMusic = async (req, res) => {
 
  
  try {
    const { id } = req.params;
    
    const music = await Music.findByIdAndDelete(id);

    if (!music) {
      return res.status(404).json({ success: false, message: "Music not found" });
    }

    res.status(200).json({ success: true, message: "Music deleted successfully" });
  } catch (error) {
    console.error("Delete Music Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
