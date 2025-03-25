import Invoice from "../models/invoice.js";
import { STATUS_CODES } from "../constants/constants.js";
import asyncHandler from 'express-async-handler';
import { servicecreateInvoice, servicedeleteInvoice, servicegetAllInvoices, servicegetInvoice } from "../services/invoiceService.js";
// Create a new Invoice
export const createInvoice = asyncHandler( async (req, res) => {
   // Create a new invoice
    const newInvoice = servicecreateInvoice(req.body);
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: 'Invoice created successfully',
      data: newInvoice
    });

});

// Get a single Invoice by paymentID
export const getInvoice = asyncHandler( async (req, res) => {

    const { userID } = req.params;

    // Find the invoice by paymentID
    const invoice = servicegetInvoice(userID); 

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: invoice
    });
 
});

// Get all Invoices
export const getAllInvoices = asyncHandler (async (req, res) => {
 
    // Retrieve all invoices
    const invoices = servicegetAllInvoices(); 

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: invoices
    });

});

// Delete an Invoice by paymentID
export const deleteInvoice =asyncHandler( async (req, res) => {

    const { paymentID } = req.params;

    // Find and delete the invoice by paymentID
    servicedeleteInvoice(paymentID); 
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'Invoice deleted successfully'
    });

});
