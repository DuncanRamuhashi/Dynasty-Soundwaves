import express from 'express';
import {createCart,getCart,updateCart,deleteCart} from '../controllers/cartController.js'
import { rolesAuth } from '../middleware/rolesAuth.js';
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/create-cart', rolesAuth('user'),createCart);
cartRouter.get('/get-cart/:id', rolesAuth('user'),getCart);
cartRouter.put('/update-cart',rolesAuth('user'),updateCart);
cartRouter.delete('/delete-cart/:id',rolesAuth('user'),deleteCart);

export default cartRouter;