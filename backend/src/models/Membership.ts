import mongoose, { Schema, Document } from 'mongoose';

export interface IMembership extends Document {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  motivation: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
}

const MembershipSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profession: { type: String, default: '' },
  motivation: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMembership>('Membership', MembershipSchema);
