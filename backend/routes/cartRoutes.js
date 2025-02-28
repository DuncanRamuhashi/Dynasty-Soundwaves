import express from 'express';
import {createCart,getCart,removeFromCart ,deleteCart,addToCart} from '../controllers/cartController.js'
import { rolesAuth } from '../middleware/rolesAuth.js';
import userAuth from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/create-cart', rolesAuth('user'),createCart);
cartRouter.put('/add-to-cart/:userID', rolesAuth('user'),addToCart);
cartRouter.get('/get-cart/:userID', rolesAuth('user'),getCart);
cartRouter.put('/remove-from-cart/:userID',rolesAuth('user'),removeFromCart);
cartRouter.delete('/delete-cart/:userID',rolesAuth('user'),deleteCart);

export default cartRouter;