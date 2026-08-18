import { body } from 'express-validator';

export const authLoginValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const contactValidator = [
  body('name').trim().isLength({ min: 2, max: 200 }).withMessage('Name is required (2-200 chars)'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().isLength({ min: 3, max: 300 }).withMessage('Subject is required (3-300 chars)'),
  body('message').trim().isLength({ min: 10, max: 10000 }).withMessage('Message is required (min 10 chars)'),
];

export const projectValidator = [
  body('title').trim().isLength({ min: 2, max: 200 }).withMessage('Title required (2-200 chars)'),
  body('slug').optional().trim().isLength({ min: 2, max: 200 }),
  body('description').trim().isLength({ min: 10 }).withMessage('Description is required (min 10 chars)'),
  body('shortDescription').optional().trim().isLength({ max: 500 }),
  body('category').optional().trim(),
  body('technologies').optional().isArray(),
  body('githubUrl').optional().trim(),
  body('liveUrl').optional().trim(),
  body('featured').optional().isBoolean(),
  body('status').optional().isIn(['Project', 'Concept / Prototype', 'In Progress', 'Archived']),
  body('year').optional().isInt({ min: 2000, max: 2100 }),
  body('order').optional().isInt(),
];

export const experienceValidator = [
  body('organization').trim().isLength({ min: 2, max: 200 }).withMessage('Organization required'),
  body('position').trim().isLength({ min: 2, max: 200 }).withMessage('Position required'),
  body('type').optional().isIn(['Internship', 'Training', 'Volunteer', 'Community', 'Work', 'Education']),
  body('technologies').optional().isArray(),
];

export const skillValidator = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Skill name required'),
  body('category').isIn(['Frontend', 'Backend', 'Tools', 'Exploring', 'Other']).withMessage('Invalid category'),
  body('proficiency').optional().isIn(['Known', 'Learning', 'Exploring']),
  body('order').optional().isInt(),
];
