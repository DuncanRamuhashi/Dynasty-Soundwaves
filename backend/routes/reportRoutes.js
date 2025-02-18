import express from 'express';
import {createReport,getReport,getAllReports,updateReport,deleteReport} from '../controllers/reportController.js'
const reportRouter = express.Router();

reportRouter.post('/create-report',createReport);
reportouter.get('/get-report/:id',getReport);
reportRouter.get('/get-all-reports',getAllReports);
reportRouter.put('/update-report/:id',updateReport);
reportRouter.delete('/delete-report/:id',deleteReport);

export default reportRouter;