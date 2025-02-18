import express from 'express';
import {createTandC,getTandC,updateTandC} from '../controllers/tsandtcController.js'
const TandCRouter = express.Router();

TandCRouter.post('/create-tsandcs',createTandC);
TandCRouter.get('/get-tsandcs',getTandC);
TandCRouter.put('/update-tsandcs',updateTandC);
export default TandCRouter;