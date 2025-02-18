import express from 'express';
import {createPayment,getPayment,getAllPayments,deletePayment} from '../controllers/paymentController.js'
const paymentRouter = express.Router();

paymentRouter.post('/create-payment',createPayment);
paymentRouter.get('/get-payment/:id',getPayment);
paymentRouter.get('/get-all-payments',getAllPayments);
paymentRouter.delete('/delete-payment/:id',deletePayment);

export default paymentRouter;