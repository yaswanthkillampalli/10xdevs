import mongoose, { Schema, Document } from 'mongoose';

export interface IPublication extends Document {
  title: string;
  description?: string;
  documentUrl: string; // The S3 URL to the PDF/DOCX
  documentType: 'pdf' | 'docx' | 'xlsx' | 'other';
  publishedDate?: Date;
  ownerId: mongoose.Types.ObjectId;
}

const PublicationSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  documentUrl: { type: String, required: true },
  documentType: { type: String, enum: ['pdf', 'docx', 'xlsx', 'other'], required: true },
  publishedDate: { type: Date },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Publication || mongoose.model<IPublication>('Publication', PublicationSchema);