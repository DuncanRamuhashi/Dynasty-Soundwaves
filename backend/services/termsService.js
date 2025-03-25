import Terms from "../models/terms.js";
// return new HttpError("No payments found for this seller",STATUS_CODES.NOT_FOUND);
// Create Terms and Conditions
export const servicecreateTandC = async (data) => {
 
    const { terms, conditions } = data;
    const newCandT = new Terms({ terms, conditions });
    await newCandT.save();
    return newCandT;


};

// Get Terms and Conditions
export const servicegetTandC = async () => {
 
    const tandC = await Terms.findOne(); // Assuming you have one set of terms and conditions
    if (!tandC) {
     
      return new HttpError("Terms and Conditions not found",STATUS_CODES.NOT_FOUND);
    }
    return tandC;
 
 
};

// Update Terms and Conditions
export const serviceupdateTandC = async (data) => {

    const { terms, conditions } = data;
    const updatedTandC = await Terms.findOneAndUpdate({}, { terms, conditions }, { new: true });
    if (!updatedTandC) {
        return new HttpError("Terms and Conditions not found",STATUS_CODES.NOT_FOUND);
    }
    return updateTandC;
 

};
