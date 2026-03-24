import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  issuingOrganization: string; // e.g., "Microsoft", "Edunet Foundation"
  issueDate: Date;
  expirationDate?: Date; // Optional, as some certs expire
  credentialId?: string;
  credentialUrl?: string; // Link to the official verification page
  documentUrl?: string; // S3 link if they uploaded the PDF certificate
  ownerId: mongoose.Types.ObjectId;
}

const CertificationSchema: Schema = new Schema({
  name: { type: String, required: true },
  issuingOrganization: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expirationDate: { type: Date },
  credentialId: { type: String },
  credentialUrl: { type: String },
  documentUrl: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);