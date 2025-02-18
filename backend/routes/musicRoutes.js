import express from 'express';
import {updateMusic,getMusicById,getAllMusic,uploadMusic,deleteMusic} from '../controllers/musicController.js'
const musicRouter = express.Router();

musicRouter.post('/upload-music',uploadMusic);
musicRouter.get('/get-music/:id',getMusicById);
musicRouter.get('/get-all-music',getAllMusic);
musicRouter.put('/update-music/:id',updateMusic);
musicRouter.delete('/delete-music/:id',deleteMusic);

export default musicRouter;