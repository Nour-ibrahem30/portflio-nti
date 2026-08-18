import { Education } from '../models/Education.model.js';

export const getAllEducation = () => Education.find().sort({ order: 1, createdAt: -1 });
export const getEducationById = (id) => Education.findById(id);
export const createEducation = (data) => Education.create(data);
export const updateEducation = (id, data) =>
  Education.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteEducation = (id) => Education.findByIdAndDelete(id);
