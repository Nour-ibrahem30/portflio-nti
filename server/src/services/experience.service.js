import { Experience } from '../models/Experience.model.js';

export const getAllExperiences = async (query = {}) => {
  const { type } = query;
  const filter = {};
  if (type) filter.type = type;
  return Experience.find(filter).sort({ order: 1, createdAt: -1 });
};

export const getExperienceById = (id) => Experience.findById(id);
export const createExperience = (data) => Experience.create(data);
export const updateExperience = (id, data) =>
  Experience.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteExperience = (id) => Experience.findByIdAndDelete(id);
