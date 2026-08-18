import { Project } from '../models/Project.model.js';
import { Experience } from '../models/Experience.model.js';
import { Skill } from '../models/Skill.model.js';
import { ContactMessage } from '../models/ContactMessage.model.js';
import { Education } from '../models/Education.model.js';

export const getDashboardStats = async () => {
  const [
    totalProjects,
    featuredProjects,
    totalExperiences,
    totalSkills,
    totalMessages,
    newMessages,
    totalEducation,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Experience.countDocuments(),
    Skill.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ status: 'new' }),
    Education.countDocuments(),
  ]);

  const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
  const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5);

  return {
    totalProjects,
    featuredProjects,
    totalExperiences,
    totalSkills,
    totalMessages,
    newMessages,
    totalEducation,
    recentMessages,
    recentProjects,
  };
};
