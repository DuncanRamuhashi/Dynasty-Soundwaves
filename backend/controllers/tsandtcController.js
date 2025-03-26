import Terms from "../models/terms.js";
import asyncHandler from 'express-async-handler';
import { servicecreateTandC,servicegetTandC,serviceupdateTandC } from "../services/termsService.js";
import { STATUS_CODES } from "../constants/constants.js";
// Create Terms and Conditions
export const createTandC = asyncHandler( async (req, res) => {
 
  
    const newCandT = await servicecreateTandC(req.body);

    res.status(STATUS_CODES.CREATED).json({ success: true, message: 'Terms and Conditions created successfully', data: newCandT });
 
});

// Get Terms and Conditions
export const getTandC =  asyncHandler( async (req, res) => {
    const info = await servicegetTandC();
    res.status(STATUS_CODES.OK).json({ success: true, data: info});
});

// Update Terms and Conditions
export const updateTandC = asyncHandler( async (req, res) => {
    const updatedTandC = await serviceupdateTandC(req.body);
    res.status(STATUS_CODES.OK).json({ success: true, message: 'Terms and Conditions updated successfully', data: updatedTandC });

});
