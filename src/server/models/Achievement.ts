import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  dateAchieved: Date;
  // Differentiates the kind of achievement
  category: 'hackathon' | 'award' | 'scholarship' | 'competition' | 'recognition';
  proofUrl?: string; // Link to a photo, certificate, or news article
  ownerId: mongoose.Types.ObjectId;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateAchieved: { type: Date, required: true },
  category: { 
    type: String, 
    enum: ['hackathon', 'award', 'scholarship', 'competition', 'recognition'], 
    required: true 
  },
  proofUrl: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);