import * as expService from '../services/experience.service.js';
const ok = (res, d, m = 'Success', s = 200) => res.status(s).json({ success: true, data: d, message: m });

export const getAll = async (req, res, next) => {
  try { ok(res, await expService.getAllExperiences(req.query), 'Experiences retrieved'); }
  catch (e) { next(e); }
};
export const getById = async (req, res, next) => {
  try {
    const i = await expService.getExperienceById(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Experience not found' });
    ok(res, i, 'Experience retrieved');
  } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { ok(res, await expService.createExperience(req.body), 'Experience created', 201); }
  catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try {
    const i = await expService.updateExperience(req.params.id, req.body);
    if (!i) return res.status(404).json({ success: false, message: 'Experience not found' });
    ok(res, i, 'Experience updated');
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try {
    const i = await expService.deleteExperience(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Experience not found' });
    ok(res, null, 'Experience deleted');
  } catch (e) { next(e); }
};
