import Report from "../models/report.js";

// Create a new Report
export const createReport = async (req, res) => {
  try {
    const { userid, totalrevenue } = req.body;
    const newReport = new Report({ userid, totalrevenue });
    await newReport.save();
    res.status(201).json({ success: true, message: 'Report created successfully', data: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get a single Report by ID
export const getReport = async (req, res) => {
  try {
    const { userID } = req.params;
    const report = await Report.findOne({userID});
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all Reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a Report by ID
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid, totalrevenue } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(id, { userid, totalrevenue }, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, message: 'Report updated successfully', data: updatedReport });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a Report by ID
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
