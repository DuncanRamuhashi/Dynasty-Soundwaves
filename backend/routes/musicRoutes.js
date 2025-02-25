import express from 'express';
import {updateMusic,getMusicById,getAllMusic,uploadMusic,deleteMusic} from '../controllers/musicController.js'
import { rolesAuth } from '../middleware/rolesAuth.js';
import userAuth from '../middleware/userAuth.js';
const musicRouter = express.Router();

musicRouter.post('/upload-music',userAuth, rolesAuth('seller'),uploadMusic);
musicRouter.get('/get-music/:id',userAuth, rolesAuth('seller'),getMusicById);
musicRouter.get('/get-all-music',getAllMusic);
musicRouter.put('/update-music/:id',updateMusic);
musicRouter.delete('/delete-music/:id',userAuth, rolesAuth('seller'),deleteMusic);

export default musicRouter;