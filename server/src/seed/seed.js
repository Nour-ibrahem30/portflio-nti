import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../models/User.model.js';
import { Project } from '../models/Project.model.js';
import { Experience } from '../models/Experience.model.js';
import { Skill } from '../models/Skill.model.js';
import { Education } from '../models/Education.model.js';
import { ContactMessage } from '../models/ContactMessage.model.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nour-portfolio';

const seed = async () => {
  console.log('[SEED] Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('[SEED] Connected. Clearing existing data...');

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Experience.deleteMany({}),
    Skill.deleteMany({}),
    Education.deleteMany({}),
  ]);

  console.log('[SEED] Seeding Admin user...');
  const hashed = await bcrypt.hash('admin123', 12);
  await User.create({
    name: 'Nour Ibrahem',
    email: 'admin@nour.dev',
    password: hashed,
    role: 'admin',
  });
  console.log('[SEED] Admin created: admin@nour.dev / admin123');

  console.log('[SEED] Seeding Education...');
  await Education.create({
    institution: 'Higher Institute of Computer Science and Management Information Systems (HICMIS)',
    degree: 'Bachelor of Management Information Systems (MIS)',
    field: 'Management Information Systems',
    startYear: 2022,
    endYear: 2026,
    expectedGraduation: '2026',
    gpa: 'Approximately 3.0–3.04',
    rank: 'Ranked around 9th in class',
    description:
      'Studying MIS with focus on systems analysis, databases, programming, and business integration. Building practical software projects alongside academic work.',
    order: 1,
  });

  console.log('[SEED] Seeding Skills...');
  const skills = [
    { name: 'HTML5', category: 'Frontend', proficiency: 'Known', order: 1 },
    { name: 'CSS3', category: 'Frontend', proficiency: 'Known', order: 2 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'Known', order: 3 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 'Learning', order: 4 },
    { name: 'React', category: 'Frontend', proficiency: 'Learning', order: 5 },
    { name: 'Angular', category: 'Frontend', proficiency: 'Learning', order: 6 },
    { name: 'Bootstrap 5', category: 'Frontend', proficiency: 'Known', order: 7 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Known', order: 8 },
    { name: 'SCSS / Sass', category: 'Frontend', proficiency: 'Known', order: 9 },
    { name: 'Responsive Design', category: 'Frontend', proficiency: 'Known', order: 10 },
    { name: 'Node.js', category: 'Backend', proficiency: 'Learning', order: 1 },
    { name: 'Express.js', category: 'Backend', proficiency: 'Learning', order: 2 },
    { name: 'REST APIs', category: 'Backend', proficiency: 'Learning', order: 3 },
    { name: 'MongoDB', category: 'Backend', proficiency: 'Learning', order: 4 },
    { name: 'Mongoose', category: 'Backend', proficiency: 'Learning', order: 5 },
    { name: 'Git', category: 'Tools', proficiency: 'Known', order: 1 },
    { name: 'GitHub', category: 'Tools', proficiency: 'Known', order: 2 },
    { name: 'VS Code', category: 'Tools', proficiency: 'Known', order: 3 },
    { name: 'Chrome DevTools', category: 'Tools', proficiency: 'Known', order: 4 },
    { name: 'Vite', category: 'Tools', proficiency: 'Known', order: 5 },
    { name: 'Webpack', category: 'Tools', proficiency: 'Exploring', order: 6 },
    { name: 'Figma', category: 'Tools', proficiency: 'Known', order: 7 },
    { name: 'AI', category: 'Exploring', proficiency: 'Exploring', order: 1 },
    { name: 'Cybersecurity', category: 'Exploring', proficiency: 'Learning', order: 2 },
    { name: 'Automation', category: 'Exploring', proficiency: 'Learning', order: 3 },
    { name: 'Embedded Systems', category: 'Exploring', proficiency: 'Exploring', order: 4 },
    { name: 'Smart Hardware', category: 'Exploring', proficiency: 'Exploring', order: 5 },
  ];
  await Skill.create(skills);
  console.log(`[SEED] ${skills.length} skills seeded.`);

  console.log('[SEED] Seeding Experience...');
  const experiences = [
    {
      organization: 'Web Master Company',
      position: 'Front-End Development Intern',
      dateLabel: '2025',
      startDate: '2025',
      endDate: '2025',
      description:
        'Frontend internship working on UI implementation, responsive interfaces, and learning modern web development workflows.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      type: 'Internship',
      order: 1,
    },
    {
      organization: 'National Telecommunication Institute (NTI)',
      position: 'Machine Learning Summer Training (120 hrs)',
      dateLabel: 'Summer 2025',
      startDate: '2025',
      endDate: '2025',
      description:
        '120-hour ML summer training program. Completed with a 91% score. Explored machine learning fundamentals and AI concepts.',
      technologies: ['Machine Learning', 'Python', 'AI Fundamentals'],
      type: 'Training',
      order: 2,
    },
    {
      organization: 'FlyRank',
      position: 'Front-End AI Engineering Internship (Accepted)',
      dateLabel: 'July 2026 Cohort',
      startDate: '2026',
      endDate: '2026',
      description:
        'Accepted into the Front-End AI Engineering internship program — a structured learning program combining frontend development with AI engineering.',
      technologies: ['Frontend', 'AI', 'TypeScript', 'React'],
      type: 'Internship',
      order: 3,
    },
    {
      organization: 'Value Marketing',
      position: 'WordPress / Web Development',
      dateLabel: 'Ongoing',
      startDate: '',
      endDate: '',
      description:
        'Web development work covering WordPress and general web development tasks.',
      technologies: ['WordPress', 'Web Development'],
      type: 'Work',
      order: 4,
    },
    {
      organization: 'GDG Banha On Campus',
      position: 'Core Team Member',
      dateLabel: 'Community',
      description:
        'Core team member contributing to community events, technical meetups, and developer-focused activities on campus.',
      technologies: ['Community', 'Events', 'Developer Relations'],
      type: 'Community',
      order: 5,
    },
    {
      organization: 'Youth Leading Youth (YLY)',
      position: 'PR Volunteer',
      dateLabel: 'Volunteer',
      description:
        'Public relations volunteer helping communicate and organize outreach for youth-led initiatives.',
      technologies: ['Public Relations', 'Communication'],
      type: 'Volunteer',
      order: 6,
    },
    {
      organization: 'Shabab Betesaed Shabab (SBS)',
      position: 'Front-End Volunteer',
      dateLabel: 'Volunteer',
      description:
        'Volunteer frontend developer helping build interfaces for community-focused initiatives.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Frontend'],
      type: 'Volunteer',
      order: 7,
    },
  ];
  await Experience.create(experiences);
  console.log(`[SEED] ${experiences.length} experience entries seeded.`);

  console.log('[SEED] Seeding Projects...');
  const projects = [
    {
      title: 'Escema',
      slug: 'escema',
      shortDescription:
        'AI-powered concept for understanding GitHub codebases and generating project structure explanations.',
      description:
        'Escema is a concept exploring how AI can help understand the structure of a GitHub project or codebase. The idea is to analyze repositories and generate useful explanations, documentation, and schema-like representations of how the project fits together. Built as a way to combine AI + Software Engineering + Developer Tools.',
      category: 'AI / Developer Tools',
      technologies: ['AI', 'GitHub API', 'Code Analysis', 'Documentation Generation'],
      featured: true,
      status: 'Concept / Prototype',
      year: 2025,
      order: 1,
    },
    {
      title: 'AI Smart Glasses',
      slug: 'ai-smart-glasses',
      shortDescription:
        'Futuristic hardware + software concept for AI-powered smart glasses.',
      description:
        'A concept/prototype exploring smart glasses that combine AI with real hardware. Thinking through the full stack: camera, microphones, speakers, sensors, battery, AR display, PCB, connectors, embedded components, and the software layer that ties it all together. Thinking about AI + Hardware + Software as one system.',
      category: 'Hardware / AI',
      technologies: ['AI', 'Embedded Systems', 'AR', 'PCB', 'Sensors'],
      featured: true,
      status: 'Concept / Prototype',
      year: 2025,
      order: 2,
    },
    {
      title: 'Laser Automation',
      slug: 'laser-automation',
      shortDescription:
        'Python project for automated image processing and design conversion for laser-machine workflows.',
      description:
        'An evolving Python-based automation project that processes designs for laser-machine workflows. Uses OpenCV, Pillow, and custom logic to handle image processing, contour detection, and SVG generation. Takes raw images and converts them into machine-ready design formats. Currently a working prototype — continuously improved.',
      category: 'Automation / Python',
      technologies: ['Python', 'OpenCV', 'Pillow', 'SVG', 'Image Processing', 'Contour Detection'],
      featured: true,
      status: 'In Progress',
      year: 2025,
      order: 3,
    },
    {
      title: 'IdentityAI',
      slug: 'identityai',
      shortDescription:
        'Concept for an AI-powered personal brand and portfolio builder.',
      description:
        'IdentityAI is a concept focused on using AI to help craft and structure a personal brand and portfolio experience. The goal is to help developers (and others) turn scattered information about themselves into a coherent, structured identity and portfolio output.',
      category: 'AI / Developer Tools',
      technologies: ['AI', 'Personal Branding', 'Portfolio Generation'],
      featured: false,
      status: 'Concept / Prototype',
      year: 2025,
      order: 4,
    },
    {
      title: 'Drivo Admin Dashboard',
      slug: 'drivo-admin-dashboard',
      shortDescription:
        'RTL Arabic admin dashboard concept for a ride-hailing management platform.',
      description:
        'A dashboard concept for managing a ride-hailing platform with a focus on RTL Arabic interface. Includes dashboard widgets, data presentation components, and management UI patterns. Demonstrates structured dashboard interface design with localization.',
      category: 'Dashboard / UI',
      technologies: ['Angular', 'TypeScript', 'RTL', 'Dashboard UI'],
      featured: true,
      status: 'Project',
      year: 2026,
      order: 5,
    },
    {
      title: 'Login & Register System',
      slug: 'login-register-system',
      shortDescription:
        'Authentication UI project with Bootstrap, SCSS, and TypeScript.',
      description:
        'A standalone authentication UI project demonstrating login and registration flows. Focuses on forms, validation, responsive design, and reusable component structure. Uses Bootstrap, SCSS, and TypeScript. (Separate from the portfolio backend auth system.)',
      category: 'Frontend / Auth UI',
      technologies: ['Bootstrap', 'SCSS', 'TypeScript', 'Forms', 'Validation'],
      featured: false,
      status: 'Project',
      year: 2025,
      order: 6,
    },
  ];
  await Project.create(projects);
  console.log(`[SEED] ${projects.length} projects seeded.`);

  console.log('[SEED] DONE. Seed data loaded successfully.');
  console.log('[SEED] Admin credentials: admin@nour.dev / admin123');
  console.log('[SEED] Please change these credentials in production!');

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('[SEED] Failed:', err);
  process.exit(1);
});
