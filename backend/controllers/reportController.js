import Report from "../models/report.js";
import { STATUS_CODES } from "../constants/constants.js";
import { servicecreateReport, servicedeleteReport, servicegetAllReports, servicegetReport, serviceupdateReport } from "../services/reportService.js";
import asyncHandler from 'express-async-handler';
// Create a new Report
export const createReport = async (req, res) => {

  
    const newReport = servicecreateReport(req.body);
    
    res.status(STATUS_CODES.CREATED).json({ success: true, message: 'Report created successfully', data: newReport });

};

// Get a single Report by ID
export const getReport = async (req, res) => {

    const { userID } = req.params;
    const report = servicegetReport(userID);
  
    res.status(STATUS_CODES.OK).json({ success: true, data: report });

};

// Get all Reports
export const getAllReports = async (req, res) => {
  
    const reports = servicegetAllReports() ;
    res.status(STATUS_CODES.OK).json({ success: true, data: reports });
 
};

// Update a Report by ID
export const updateReport = async (req, res) => {
  
    const { id } = req.params;
    const { userid, totalrevenue } = req.body;

    const updatedReport = await serviceupdateReport(id,userid,totalrevenue); 


    res.status(STATUS_CODES.OK).json({ success: true, message: 'Report updated successfully', data: updatedReport });
  }

// Delete a Report by ID
export const deleteReport = async (req, res) => {

    const { id } = req.params;
    const report =  servicedeleteReport(id);
 
    res.status(STATUS_CODES.OK).json({ success: true, message: 'Report deleted successfully' });

};
