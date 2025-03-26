import { STATES } from "mongoose";
import Cart from "../models/cart.js";
import { STATUS_CODES } from "../constants/constants.js";

// Create a new Cart
export const servicecreateCart = async (cartData) => {

    const { userID, musicIDS } = cartData;

    // Validate input
    if (!userID) {
        throw new HttpError("User ID is required",STATUS_CODES.BAD_REQUEST);
      
    }

    // Check if a cart already exists for this user
    const existingCart = await Cart.findOne({ userID });
    if (existingCart) {
     
        throw new HttpError("exits",STATUS_CODES.BAD_REQUEST);
    }

    // Create a new cart with musicIDS defaulting to empty array if not provided
    const newCart = new Cart({ 
      userID, 
      musicIDS: Array.isArray(musicIDS) ? musicIDS : [] 
    });

    await newCart.save();

    return newCart;

};

// Get a Cart by user ID
export const servicegetCart = async (id) => {

    const userID  = id;

    const cart = await Cart.findOne({"userID": userID });
    
    if (!cart) {
        throw res.status(200).json({ success: true, message: 'none'});
    }

    return cart;
};

// Add music ID to Cart
export const serviceaddToCart = async (userIdP, musicIdb) => {

    const  userID  = userIdP;
    const musicID  = musicIdb;

    if (!musicID) {
        throw new HttpError("Music ID is required",STATUS_CODES.BAD_REQUEST);
   
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
        throw new HttpError("Music ID already in cart",STATUS_CODES.BAD_REQUEST);
        
      }
    }

    await cart.save();

   return cart;

};

// Remove music ID from Cart
export const serviceremoveFromCart = async (userIdP, musicIdb) => {
  
    const  userID  = userIdP;
    const musicID  = musicIdb;

    if (!musicID) {
   
        throw new HttpError("Music ID is required",STATUS_CODES.BAD_REQUEST);
    }

    const cart = await Cart.findOne({ userID });

    if (!cart) {
    
        throw new HttpError("Cart not found",STATUS_CODES.NOT_FOUND);
    }

    const initialLength = cart.musicIDS.length;
    cart.musicIDS = cart.musicIDS.filter(id => id !== musicID);

    if (initialLength === cart.musicIDS.length) {
     
        throw new HttpError("Music ID not found in cart",STATUS_CODES.BAD_REQUEST);
    }

    await cart.save();
     return cart;

};

// Delete entire Cart
export const servicedeleteCart = async (id) => {

    const  userID  = id;

    const deletedCart = await Cart.findOneAndDelete({ userID });

    if (!deletedCart) {
      
        throw new HttpError("Cart not found",STATUS_CODES.NOT_FOUND);
    }



};