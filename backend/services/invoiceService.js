import Invoice from "../models/invoice.js";
import { STATUS_CODES } from "../constants/constants.js";
// Create a new Invoice
export const servicecreateInvoice = async (data) => {

    const { paymentID, userID, fullamount, status } = data;

    // Create a new invoice
    const newInvoice = new Invoice({
      paymentID,
      userID,
      fullamount,
      status
    });

    // Save the invoice to the database
    await newInvoice.save();
    return newInvoice;
};

// Get a single Invoice by paymentID
export const servicegetInvoice = async (id) => {

    const  userID = id;

    // Find the invoice by paymentID
    const invoice = await Invoice.findOne({ userID });

    if (!invoice) {
      
        throw new HttpError("Invoice not found",STATUS_CODES.NOT_FOUND);
            
    }

  return invoice;
};

// Get all Invoices
export const servicegetAllInvoices = async () => {
 
    // Retrieve all invoices
    const invoices = await Invoice.find();

    return invoices;

};

// Delete an Invoice by paymentID
export const servicedeleteInvoice = async (id) => {

    const paymentID  = id;

    // Find and delete the invoice by paymentID
    const deletedInvoice = await Invoice.findOneAndDelete({ paymentID });

    if (!deletedInvoice) {
        throw new HttpError("Invoice not found",STATUS_CODES.NOT_FOUND);
     
    }



};
