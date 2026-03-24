import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  thumbnailUrl: string;
  repoUrl?: string;
  liveUrl?: string;
  ownerId: mongoose.Types.ObjectId; // The person who uploaded the project
  teamMembers: mongoose.Types.ObjectId[]; // Array of co-creators
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }], 
  thumbnailUrl: { type: String, required: true },
  repoUrl: { type: String },
  liveUrl: { type: String },
  
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  // The new field: An array of ObjectIds, referencing the 'User' collection
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);