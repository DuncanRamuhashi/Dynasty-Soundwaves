import Payment from "../models/payment.js";
import Music from "../models/music.js";
import User from "../models/User.js";
import Cart from '../models/cart.js';

// Create a new Payment and update downloadable status, then remove items from the cart
export const createPayment = async (req, res) => {
  try {
    const { userID, sellerID, fullAmount, musicIDs, cartID } = req.body;

    // Find existing payment for the user
    let payment = await Payment.findOne({ userID });

    if (payment) {
      // Add new payment to existing array
      payment.payments.push({
        sellerID,
        fullAmount,
        musicIDs,
      });
      await payment.save();
    } else {
      // Create new payment document
      payment = new Payment({
        userID,
        payments: [
          {
            sellerID,
            fullAmount,
            musicIDs,
          },
        ],
      });
      await payment.save();
    }

    // Update the purchased music's downloadable field to true
    await Music.updateMany(
      { _id: { $in: musicIDs } }, // Find music by IDs
      { $set: { downloadable: true, userID: userID } } // Update fields
    );

    // Remove items from the cart after payment
    if (cartID) {
      console.log('Deleting cart with ID:', cartID); // Debugging
      const deletedCart = await Cart.findByIdAndDelete(cartID);
      if (!deletedCart) {
        console.log('No cart found with that ID');
      } else {
        console.log('Cart deleted successfully');
      }
    }

    res.status(201).json({
      success: true,
      message: "Payment created successfully, music is now downloadable, and cart has been cleared",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getSellerPayment = async (req, res) => {
  try {
    const { sellerID } = req.params;

    // Fetch payments related to the seller and populate user and music data
    const payments = await Payment.find({ "payments.sellerID": sellerID })
      .populate("userID", "name email") 
      .populate("payments.musicIDs", "title"); 

    if (!payments.length) {
      return res.status(404).json({
        success: false,
        message: "No payments found for this seller",
      });
    }

    // Format seller payments
    const sellerPayments = payments.flatMap((payment) =>
      payment.payments
        .filter((p) => p.sellerID === sellerID)
        .map((p) => ({
          userEmail: payment.userID?.email || "N/A", // Access populated user data
          userName: payment.userID?.name || "N/A",   // Access populated user data
          songNames: p.musicIDs.map((music) => music.title).join(", ") || "N/A", // Access populated music data
          amount: p.fullAmount,
        }))
    );

    res.status(200).json({
      success: true,
      data: sellerPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getUserPayment = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log('userid', userID);

    const payment = await Payment.find({"userID": userID });

    if (payment.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payments found for this user",
      });
    }

    console.log(payment);
    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete a specific payment from a user's payments array
export const deletePayment = async (req, res) => {
  try {
    const { paymentID } = req.params;

    const payment = await Payment.findOneAndUpdate(
      { "payments._id": paymentID },
      { $pull: { payments: { _id: paymentID } } },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
