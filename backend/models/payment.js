import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    // Change userID to ObjectId to properly reference the User model
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    payments: [
      {
        sellerID: { type: String, required: true },
        fullAmount: { type: Number, required: true },
        musicIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }], // References to Music model
      },
    ],
  },
  { timestamps: true }
);

// Validation before saving
PaymentSchema.pre('save', async function (next) {
  if (this.payments.some((payment) => payment.fullAmount <= 0)) {
    return next(new Error('All amounts must be greater than zero'));
  }
  next();
});

export default mongoose.model('Instalment', PaymentSchema);
