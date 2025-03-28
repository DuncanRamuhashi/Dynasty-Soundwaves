import Report from "../models/report.js";
import HttpError from "../utils/HttpError.js";
// Create a new Report
export const servicecreateReport = async (data) => {

    const { userid, totalrevenue } = data;
    const newReport = new Report({ userid, totalrevenue });
    await newReport.save();
};

// Get a single Report by ID
export const servicegetReport = async (id) => {
  
    const  userID  = id;
    const report = await Report.findOne({userID});
    if (!report) {
      
        throw new HttpError("Report not found",STATUS_CODES.NOT_FOUND);
    }
    return report;

};

// Get all Reports
export const servicegetAllReports = async () => {

    const reports = await Report.find();
    return reports;

};

// Update a Report by ID
export const serviceupdateReport = async (idp,useridb,total) => {

    const id  =idp;
    const  userid = useridb ;
    const totalrevenue  = total;

    const updatedReport = await Report.findByIdAndUpdate(id, { userid, totalrevenue }, { new: true });
    if (!updatedReport) {
        throw new HttpError("Report not found",STATUS_CODES.NOT_FOUND);
    }

    return updateReport;
}


// Delete a Report by ID
export const servicedeleteReport = async (idp) => {

    const  id  = idp;
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
        throw new HttpError("Report not found",STATUS_CODES.NOT_FOUND);
    }
    
 
};
