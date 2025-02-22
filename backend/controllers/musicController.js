import Music from "../models/music.js";

// Create music
export const uploadMusic = async (req, res) => {
  try {
    const { title, duration, genre, bpm,mood, price, audio, sellerID, tags, image } = req.body;
    const newMusic = new Music({ title, duration, genre, bpm,mood, price, audio, sellerID, tags, image });
    await newMusic.save();
    res.status(201).json({ success: true, message: 'Music uploaded successfully', data: newMusic });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all music
export const getAllMusic = async (req, res) => {
  try {
    const music = await Music.find();
    res.status(200).json({ success: true, data: music });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get one music by ID
export const getMusicById = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({ success: false, message: 'Music not found' });
    }
    res.status(200).json({ success: true, data: music });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update music by ID
export const updateMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, genre, bpm,mood, price, audio, sellerID, tags, image,downloadable } = req.body;
    
    const updatedMusic = await Music.findByIdAndUpdate(id, { title, duration, genre, bpm,mood, price, audio, sellerID, tags, image,downloadable }, { new: true });
    if (!updatedMusic) {
      return res.status(404).json({ success: false, message: 'Music not found' });
    }

    res.status(200).json({ success: true, message: 'Music updated successfully', data: updatedMusic });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete music by ID
export const deleteMusic = async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByIdAndDelete(id);
    if (!music) {
      return res.status(404).json({ success: false, message: 'Music not found' });
    }

    res.status(200).json({ success: true, message: 'Music deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
