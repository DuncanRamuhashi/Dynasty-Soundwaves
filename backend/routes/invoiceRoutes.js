import express from 'express';
import {createInvoice,getInvoice,getAllInvoices,deleteInvoice} from '../controllers/invoiceController.js'
const invoiceRouter = express.Router();

invoiceRouter.post('/create-invoice',createInvoice);
invoiceRouter.get('/get-invoice/:id',getInvoice);
invoiceRouter.get('/get-all-invoices',getAllInvoices);
invoiceRouter.delete('/delete-invoice/:id',deleteInvoice);

export default invoiceRouter;