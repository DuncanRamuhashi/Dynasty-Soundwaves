import Payment from "../models/payment.js";

// Create a new Payment
export const createPayment = async (req, res) => {
  try {
    const { userID, fullamount, status } = req.body;

    // Create a new payment entry
    const newPayment = new Payment({
      userID,
      fullamount,
      status
    });

    // Save the payment to the database
    await newPayment.save();

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: newPayment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a single Payment by ID
export const getPayment = async (req, res) => {
  try {
    const { paymentID } = req.params;

    // Find the payment by its ID
    const payment = await Payment.findById(paymentID);

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get all Payments
export const getAllPayments = async (req, res) => {
  try {
    // Retrieve all payments
    const payments = await Payment.find();

    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Delete a Payment by paymentID
export const deletePayment = async (req, res) => {
  try {
    const { paymentID } = req.params;

    // Find and delete the payment by paymentID
    const deletedPayment = await Payment.findByIdAndDelete(paymentID);

    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
