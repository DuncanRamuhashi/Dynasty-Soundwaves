import Cart from "../models/cart.js";

// Create a new Cart
export const createCart = async (req, res) => {
  try {
    const { userID, musicIDS } = req.body;

    // Check if a cart already exists for this user
    const existingCart = await Cart.findOne({ userID });
    if (existingCart) {
      return res.status(400).json({ success: false, message: 'Cart already exists for this user' });
    }

    // Create a new cart for the user
    const newCart = new Cart({ userID, musicIDS });

    // Save the cart to the database
    await newCart.save();

    res.status(201).json({
      success: true,
      message: 'Cart created successfully',
      data: newCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get a Cart by user ID
export const getCart = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find the cart for the specific user
    const cart = await Cart.findOne({ userID });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a Cart (Add/Remove musicIDs)
export const updateCart = async (req, res) => {
  try {
    const { userID } = req.params;
    const { musicIDS } = req.body;

    // Find the cart for the user and update the musicIDS
    const updatedCart = await Cart.findOneAndUpdate(
      { userID },
      { $set: { musicIDS } },
      { new: true } // Return the updated document
    );

    if (!updatedCart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a Cart by user ID
export const deleteCart = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find and delete the cart for the user
    const deletedCart = await Cart.findOneAndDelete({ userID });

    if (!deletedCart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
