import Invoice from "../models/invoice.js";

// Create a new Invoice
export const createInvoice = async (req, res) => {
  try {
    const { paymentID, userID, fullamount, status } = req.body;

    // Create a new invoice
    const newInvoice = new Invoice({
      paymentID,
      userID,
      fullamount,
      status
    });

    // Save the invoice to the database
    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: newInvoice
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get a single Invoice by paymentID
export const getInvoice = async (req, res) => {
  try {
    const { userID } = req.params;

    // Find the invoice by paymentID
    const invoice = await Invoice.findOne({ userID });

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Get all Invoices
export const getAllInvoices = async (req, res) => {
  try {
    // Retrieve all invoices
    const invoices = await Invoice.find();

    res.status(200).json({
      success: true,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Delete an Invoice by paymentID
export const deleteInvoice = async (req, res) => {
  try {
    const { paymentID } = req.params;

    // Find and delete the invoice by paymentID
    const deletedInvoice = await Invoice.findOneAndDelete({ paymentID });

    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
