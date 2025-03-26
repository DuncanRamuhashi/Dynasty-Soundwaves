import Cart from "../models/cart.js";
import { STATUS_CODES } from "../constants/constants.js";
// Create a new Cart
import asyncHandler from 'express-async-handler';
import { serviceaddToCart, servicecreateCart, servicegetCart, serviceremoveFromCart } from "../services/cartService.js";
export const createCart =asyncHandler( async (req, res) => {

    // Create a new cart with musicIDS defaulting to empty array if not provided
    const newCart = servicecreateCart(req.body);

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: 'Cart created successfully',
      data: newCart,
    });

});

// Get a Cart by user ID
export const getCart =asyncHandler( async (req, res) => {

    const { userID } = req.params;
  
    const cart = servicegetCart(userID); 
    
  

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: cart,
    });

});

// Add music ID to Cart
export const addToCart =asyncHandler( async (req, res) => {
 
    const { userID } = req.params;
    const { musicID } = req.body;

 

    let cart = serviceaddToCart(userID,musicID);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    });
 
});

// Remove music ID from Cart
export const removeFromCart =asyncHandler( async (req, res) => {

    const { userID } = req.params;
    const { musicID } = req.body;


    const cart = serviceremoveFromCart(userID,musicID);

 

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart,
    });

});

// Delete entire Cart
export const deleteCart =asyncHandler( async (req, res) => {
 
    const { userID } = req.params;
    servicedeleteCart(userID);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'Cart deleted successfully',
    });

});