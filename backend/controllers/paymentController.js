import Payment from "../models/payment.js";
import Music from "../models/music.js"; // Import Music model

// Create a new Payment and update downloadable status
export const createPayment = async (req, res) => {
  try {
    const { userID, sellerID, fullAmount, musicIDs } = req.body; 

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

    res.status(201).json({
      success: true,
      message: "Payment created successfully, music is now downloadable",
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


// Get payments for a specific seller
export const getSellerPayment = async (req, res) => {
  try {
    const { sellerID } = req.params;

    const payments = await Payment.find({ "payments.sellerID": sellerID });

    if (!payments.length) {
      return res.status(404).json({
        success: false,
        message: "No payments found for this seller",
      });
    }

    const sellerPayments = payments.flatMap((payment) =>
      payment.payments.filter((p) => p.sellerID === sellerID)
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

// Get all payments for a user
export const getUserPayment = async (req, res) => {
  try {
    const { userID } = req.params;
  console.log('userid',userID);
    const payment = await Payment.findOne({ userID });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "No payments found for this user",
      });
    }

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
