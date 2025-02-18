import express from 'express';
import {createCart,getCart,updateCart,deleteCart} from '../controllers/cartController.js'


const cartRouter = express.Router();

cartRouter.post('/create-cart',createCart);
cartRouter.get('/get-cart/:id',getCart);
cartRouter.put('/update-cart',updateCart);
cartRouter.delete('/delete-cart/:id',deleteCart);

export default cartRouter;