import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    sellerID: { type: String, required: true },
    fullamount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Instalment", PaymentSchema);
