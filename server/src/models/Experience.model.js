import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
      maxlength: [200, 'Organization must be at most 200 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [200, 'Position must be at most 200 characters'],
    },
    startDate: {
      type: String,
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
    },
    dateLabel: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['Internship', 'Training', 'Volunteer', 'Community', 'Work', 'Education'],
      default: 'Work',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

experienceSchema.index({ type: 1, order: 1 });

export const Experience = mongoose.model('Experience', experienceSchema);
