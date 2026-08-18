import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution is required'],
      trim: true,
      maxlength: [300, 'Institution must be at most 300 characters'],
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
      maxlength: [200, 'Degree must be at most 200 characters'],
    },
    field: {
      type: String,
      trim: true,
      default: '',
    },
    startYear: Number,
    endYear: Number,
    expectedGraduation: String,
    gpa: String,
    rank: String,
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model('Education', educationSchema);
