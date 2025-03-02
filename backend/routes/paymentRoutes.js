import express from 'express';
import {createPayment,getsellerPayment,getuserPayment,getAllPayments,deletePayment} from '../controllers/paymentController.js'
const paymentRouter = express.Router();

paymentRouter.post('/create-payment',createPayment);
paymentRouter.get('/get-seller-payment/:id',getsellerPayment);
paymentRouter.get('/get-user-payment/:id',getuserPayment);
paymentRouter.get('/get-all-payments',getAllPayments);
paymentRouter.delete('/delete-payment/:id',deletePayment);

export default paymentRouter;