import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  amount: number;
  type: string;
  name: string;
  email: string;
  paymentMethod: string;
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, default: 'ONE_TIME' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, default: 'MOBILE_MONEY' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDonation>('Donation', DonationSchema);
