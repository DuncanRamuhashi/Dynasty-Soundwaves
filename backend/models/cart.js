import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {

    musicIDS: { type: [mongoose.Schema.Types.ObjectId], ref: 'Music', default: [] },
    

    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', CartSchema);
