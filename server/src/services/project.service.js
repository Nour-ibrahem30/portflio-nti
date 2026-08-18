import { Project } from '../models/Project.model.js';
import { slugify } from '../utils/helpers.js';

export const getAllProjects = async (query = {}) => {
  const { featured, category, status, search } = query;
  const filter = {};
  if (featured === 'true') filter.featured = true;
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { technologies: { $regex: search, $options: 'i' } },
    ];
  }
  return Project.find(filter).sort({ order: 1, createdAt: -1 });
};

export const getProjectBySlug = async (slug) => Project.findOne({ slug });

export const getProjectById = async (id) => Project.findById(id);

export const createProject = async (data) => {
  if (!data.slug) data.slug = slugify(data.title);
  return Project.create(data);
};

export const updateProject = async (id, data) => {
  if (data.title && !data.slug) data.slug = slugify(data.title);
  return Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProject = async (id) => Project.findByIdAndDelete(id);
