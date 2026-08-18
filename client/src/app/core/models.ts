export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: { field: string; message: string }[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category?: string;
  technologies?: string[];
  image?: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: 'Project' | 'Concept / Prototype' | 'In Progress' | 'Archived';
  year?: number;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id?: string;
  organization: string;
  position: string;
  startDate?: string;
  endDate?: string;
  dateLabel?: string;
  description?: string;
  technologies?: string[];
  type?: 'Internship' | 'Training' | 'Volunteer' | 'Community' | 'Work' | 'Education';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Exploring' | 'Other';
  proficiency?: 'Known' | 'Learning' | 'Exploring';
  icon?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field?: string;
  startYear?: number;
  endYear?: number;
  expectedGraduation?: string;
  gpa?: string;
  rank?: string;
  description?: string;
  order?: number;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  totalExperiences: number;
  totalSkills: number;
  totalMessages: number;
  newMessages: number;
  totalEducation: number;
  recentMessages: ContactMessage[];
  recentProjects: Project[];
}

export type Theme = 'dark' | 'light' | 'system';
