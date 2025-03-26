import Report from "../models/report.js";
import { STATUS_CODES } from "../constants/constants.js";
import { servicecreateReport, servicedeleteReport, servicegetAllReports, servicegetReport, serviceupdateReport } from "../services/reportService.js";
import asyncHandler from 'express-async-handler';
// Create a new Report
export const createReport =asyncHandler( async (req, res) => {

  
    const newReport = await servicecreateReport(req.body);
    
    res.status(STATUS_CODES.CREATED).json({ success: true, message: 'Report created successfully', data: newReport });

});

// Get a single Report by ID
export const getReport =asyncHandler( async (req, res) => {

    const { userID } = req.params;
    const report =await servicegetReport(userID);
  
    res.status(STATUS_CODES.OK).json({ success: true, data: report });

});

// Get all Reports
export const getAllReports =asyncHandler( async (req, res) => {
  
    const reports =await servicegetAllReports() ;
    res.status(STATUS_CODES.OK).json({ success: true, data: reports });
 
});

// Update a Report by ID
export const updateReport = asyncHandler( async (req, res) => {
  
    const { id } = req.params;
    const { userid, totalrevenue } = req.body;

    const updatedReport = await serviceupdateReport(id,userid,totalrevenue); 


    res.status(STATUS_CODES.OK).json({ success: true, message: 'Report updated successfully', data: updatedReport });
  });

// Delete a Report by ID
export const deleteReport =asyncHandler( async (req, res) => {

    const { id } = req.params;
    await   servicedeleteReport(id);
 
    res.status(STATUS_CODES.OK).json({ success: true, message: 'Report deleted successfully' });

});
