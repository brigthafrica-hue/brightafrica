import mongoose, { Schema, Document } from 'mongoose';

export interface ISafeguarding extends Document {
  reporterType: string;
  incidentType: string;
  location: string;
  description: string;
  contactInfo?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: Date;
}

const SafeguardingSchema: Schema = new Schema({
  reporterType: { type: String, required: true },
  incidentType: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, default: '' },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISafeguarding>('Safeguarding', SafeguardingSchema);
