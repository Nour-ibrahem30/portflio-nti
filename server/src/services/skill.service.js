import { Skill } from '../models/Skill.model.js';

export const getAllSkills = async (query = {}) => {
  const { category } = query;
  const filter = {};
  if (category) filter.category = category;
  return Skill.find(filter).sort({ order: 1, createdAt: 1 });
};

export const getSkillById = (id) => Skill.findById(id);
export const createSkill = (data) => Skill.create(data);
export const updateSkill = (id, data) =>
  Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteSkill = (id) => Skill.findByIdAndDelete(id);
