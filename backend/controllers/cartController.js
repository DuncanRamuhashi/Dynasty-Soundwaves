import Cart from "../models/cart.js";

// Create a new Cart
export const createCart = async (req, res) => {
  try {
    const { userID, musicIDS } = req.body;

    // Validate input
    if (!userID) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Check if a cart already exists for this user
    const existingCart = await Cart.findOne({ userID });
    if (existingCart) {
      return res.status(400).json({ success: false, message: 'exits' });
    }

    // Create a new cart with musicIDS defaulting to empty array if not provided
    const newCart = new Cart({ 
      userID, 
      musicIDS: Array.isArray(musicIDS) ? musicIDS : [] 
    });

    await newCart.save();

    res.status(201).json({
      success: true,
      message: 'Cart created successfully',
      data: newCart,
    });
  } catch (error) {
    console.error('Create cart error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get a Cart by user ID
export const getCart = async (req, res) => {
  try {
    const { userID } = req.params;

    const cart = await Cart.findOne({ userID });

    if (!cart) {
      return res.status(200).json({ success: true, message: 'none'});
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Add music ID to Cart
export const addToCart = async (req, res) => {
  try {
    const { userID } = req.params;
    const { musicID } = req.body;

    if (!musicID) {
      return res.status(400).json({ success: false, message: 'Music ID is required' });
    }

    let cart = await Cart.findOne({ userID });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({
        userID,
        musicIDS: [musicID]
      });
    } else {
      // Add musicID if it's not already in the cart
      if (!cart.musicIDS.includes(musicID)) {
        cart.musicIDS.push(musicID);
      } else {
        return res.status(400).json({ success: false, message: 'Music ID already in cart' });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Remove music ID from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { userID } = req.params;
    const { musicID } = req.body;

    if (!musicID) {
      return res.status(400).json({ success: false, message: 'Music ID is required' });
    }

    const cart = await Cart.findOne({ userID });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const initialLength = cart.musicIDS.length;
    cart.musicIDS = cart.musicIDS.filter(id => id !== musicID);

    if (initialLength === cart.musicIDS.length) {
      return res.status(400).json({ success: false, message: 'Music ID not found in cart' });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart,
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete entire Cart
export const deleteCart = async (req, res) => {
  try {
    const { userID } = req.params;

    const deletedCart = await Cart.findOneAndDelete({ userID });

    if (!deletedCart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully',
    });
  } catch (error) {
    console.error('Delete cart error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};