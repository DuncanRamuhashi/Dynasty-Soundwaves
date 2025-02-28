import express from 'express';
import {createCart,getCart,removeFromCart ,deleteCart,addToCart} from '../controllers/cartController.js'
import { rolesAuth } from '../middleware/rolesAuth.js';
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/create-cart',userAuth, rolesAuth('user'),createCart);
cartRouter.put('/add-to-cart/:id',userAuth, rolesAuth('user'),addToCart);
cartRouter.get('/get-cart/:id',userAuth, rolesAuth('user'),getCart);
cartRouter.put('/remove-from-cart/:id',userAuth,rolesAuth('user'),removeFromCart);
cartRouter.delete('/delete-cart/:id',userAuth,rolesAuth('user'),deleteCart);

export default cartRouter;