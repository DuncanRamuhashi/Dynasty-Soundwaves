import express from 'express';
import userAuth from '../middleware/userAuth.js';
import {createPayment,getSellerPayment,getUserPayment,getAllPayments,deletePayment} from '../controllers/paymentController.js'
const paymentRouter = express.Router();

paymentRouter.post('/create-payment',userAuth,createPayment);
paymentRouter.get('/get-seller-payment/:id',userAuth,getSellerPayment);
paymentRouter.get('/get-user-payment/:id',userAuth,getUserPayment);
paymentRouter.get('/get-all-payments',userAuth,getAllPayments);
paymentRouter.delete('/delete-payment/:id',userAuth,deletePayment);

export default paymentRouter;