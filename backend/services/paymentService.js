import Payment from "../models/payment.js";
import Music from "../models/music.js";

import Cart from '../models/cart.js';
import { STATUS_CODES } from "../constants/constants.js";


export const servicecreatePayment = async (data) => {

    const { userID, sellerID, fullAmount, musicIDs, cartID } = data;

    // Find existing payment for the user
    let payment = await Payment.findOne({userID});

    if (payment) {
      // Add new payment to existing array
      payment.payments.push({
        sellerID,
        fullAmount,
        musicIDs,
      });
      await payment.save();
    } else {
     
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


    await Music.updateMany(
      { _id: { $in: musicIDs } }, // Find music by IDs
      { $set: { downloadable: true, userID: userID } } // Update fields
    );

   
    if (cartID) {
      console.log('Deleting cart with ID:', cartID); 
      const deletedCart = await Cart.findByIdAndDelete(cartID);
      if (!deletedCart) {
        console.log('No cart found with that ID');
      } else {
        console.log('Cart deleted successfully');
      }
    }
     return payment;


};

export const servicegetSellerPayment = async (id) => {

    const { sellerID } = id;

   
    const payments = await Payment.find({ "payments.sellerID": sellerID })
      .populate("userID", "name email") 
      .populate("payments.musicIDs", "title"); 

    if (!payments.length) {
        return new HttpError("No payments found for this seller",STATUS_CODES.NOT_FOUND);
    }


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

  return sellerPayments;

}
export const servicegetUserPayment = async (id) => {

    const { userID } = id;
  

    const payment = await Payment.find({"userID": userID });

    if (payment.length === 0) {

       return new HttpError("No payments found for this user",STATUS_CODES.NOT_FOUND);
    }

 return payment;

};

// Get all Payments
export const servicegetAllPayments = async (req, res) => {
 
    const payments = await Payment.find();

  return payments;

};

// Delete a specific payment from a user's payments array
export const servicedeletePayment = async (id) => {

    const { paymentID } = id;

    const payment = await Payment.findOneAndUpdate(
      { "payments._id": paymentID },
      { $pull: { payments: { _id: paymentID } } },
      { new: true }
    );

    if (!payment) {
        return new HttpError("No payment found for this user",STATUS_CODES.NOT_FOUND);
    }

 

};
