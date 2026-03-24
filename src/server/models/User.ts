import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript Interface
export interface IUser extends Document {
  rollId: string; // Student Roll Number or Faculty Employee ID
  email: string;
  passwordHash: string;
  role: 'student' | 'faculty' | 'admin';
  name: string;
  avatarUrl?: string;
  bio?: string;
  
  // Student Specific
  branch?: string;
  graduationYear?: number;
  resumeUrl?: string; 
  
  // Faculty Specific
  department?: string;
  designation?: string;
  
  // Shared Socials
  githubUrl?: string;
  linkedinUrl?: string;
}

// 2. Define the Mongoose Schema
const UserSchema: Schema = new Schema({
  rollId: { type: String, required: true, unique: true }, // Ensures no duplicates!
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  name: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  
  branch: { type: String },
  graduationYear: { type: Number },
  resumeUrl: { type: String },
  
  department: { type: String },
  designation: { type: String },
  
  githubUrl: { type: String },
  linkedinUrl: { type: String },
}, { timestamps: true });

// 3. Export the Model Safely
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);