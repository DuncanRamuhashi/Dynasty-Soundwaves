import Terms from "../models/terms.js";

// Create Terms and Conditions
export const createTandC = async (req, res) => {
  try {
    const { terms, conditions } = req.body;
    const newCandT = new Terms({ terms, conditions });
    await newCandT.save();
    res.status(201).json({ success: true, message: 'Terms and Conditions created successfully', data: newCandT });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get Terms and Conditions
export const getTandC = async (req, res) => {
  try {
    const tandC = await Terms.findOne(); // Assuming you have one set of terms and conditions
    if (!tandC) {
      return res.status(404).json({ success: false, message: 'Terms and Conditions not found' });
    }
    res.status(200).json({ success: true, data: tandC });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update Terms and Conditions
export const updateTandC = async (req, res) => {
  try {
    const { terms, conditions } = req.body;
    const updatedTandC = await Terms.findOneAndUpdate({}, { terms, conditions }, { new: true });
    if (!updatedTandC) {
      return res.status(404).json({ success: false, message: 'Terms and Conditions not found' });
    }
    res.status(200).json({ success: true, message: 'Terms and Conditions updated successfully', data: updatedTandC });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
