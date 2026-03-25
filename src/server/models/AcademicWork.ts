import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicWork extends Document {
  title: string;
  description: string;
  domain: string;
  
  // Categorization
  workType: 'research_project' | 'publication' | 'thesis' | 'patent';
  status: 'ongoing' | 'completed' | 'published';
  
  // Dates
  startDate?: Date;
  completionOrPublishDate?: Date;
  
  // Publication Specifics (For the PDF viewer)
  documentUrl?: string; // S3 link to the actual PDF document
  externalLink?: string; // Link to IEEE, Springer, etc.
  
  // Research / R&D Specifics
  fundingAgency?: string; 
  grantAmount?: string; 
  
  // Relational Links
  ownerId: mongoose.Types.ObjectId; // Lead researcher / author
  collaborators: mongoose.Types.ObjectId[]; // Co-authors or student assistants
}

const AcademicWorkSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  
  workType: { 
    type: String, 
    enum: ['research_project', 'publication', 'thesis', 'patent'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['ongoing', 'completed', 'published'], 
    required: true,
    default: 'completed'
  },
  
  startDate: { type: Date },
  completionOrPublishDate: { type: Date },
  
  documentUrl: { type: String },
  externalLink: { type: String },
  
  fundingAgency: { type: String },
  grantAmount: { type: String },
  
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.models.AcademicWork || mongoose.model<IAcademicWork>('AcademicWork', AcademicWorkSchema);