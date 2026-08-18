import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Skill name must be at most 100 characters'],
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Tools', 'Exploring', 'Other'],
      required: [true, 'Category is required'],
    },
    proficiency: {
      type: String,
      enum: ['Known', 'Learning', 'Exploring'],
      default: 'Known',
    },
    icon: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model('Skill', skillSchema);
