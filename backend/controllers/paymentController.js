import Payment from "../models/payment.js";
import Music from "../models/music.js";
import User from "../models/User.js";
import Cart from '../models/cart.js';
import { STATUS_CODES } from "../constants/constants.js";
import asyncHandler from 'express-async-handler';
import { servicecreatePayment, servicedeletePayment, servicegetAllPayments, servicegetSellerPayment, servicegetUserPayment } from "../services/paymentService.js";
// Create a new Payment and update downloadable status, then remove items from the cart
export const createPayment = asyncHandler( async (req, res) => {
    let payment =await servicecreatePayment(req.body);

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Payment created successfully, music is now downloadable, and cart has been cleared",
      data: payment,
    });
 
});

export const getSellerPayment =asyncHandler( async (req, res) => {

    const { sellerID } = req.params;

    // Format seller payments
    const sellerPayments =await servicegetSellerPayment(sellerID) ;

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: sellerPayments,
    });

});

export const getUserPayment =asyncHandler( async (req, res) => {

    const { userID } = req.params;
   

    const payment =await servicegetUserPayment(userID);

    

    
    res.status(STATUS_CODES.OK).json({
      success: true,
      data: payment,
    });

});

// Get all Payments
export const getAllPayments =asyncHandler( async (req, res) => {
 
    const payments = await servicegetAllPayments();

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: payments,
    });

});

// Delete a specific payment from a user's payments array
export const deletePayment =asyncHandler( async (req, res) => {

    const { paymentID } = req.params;

    await servicedeletePayment(paymentID); 
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Payment deleted successfully",
    });

});
