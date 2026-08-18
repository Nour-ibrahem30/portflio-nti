import * as eduService from '../services/education.service.js';
const ok = (res, d, m = 'Success', s = 200) => res.status(s).json({ success: true, data: d, message: m });

export const getAll = async (req, res, next) => {
  try { ok(res, await eduService.getAllEducation(), 'Education retrieved'); }
  catch (e) { next(e); }
};
export const getById = async (req, res, next) => {
  try {
    const i = await eduService.getEducationById(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Education entry not found' });
    ok(res, i, 'Education retrieved');
  } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { ok(res, await eduService.createEducation(req.body), 'Education created', 201); }
  catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try {
    const i = await eduService.updateEducation(req.params.id, req.body);
    if (!i) return res.status(404).json({ success: false, message: 'Education entry not found' });
    ok(res, i, 'Education updated');
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try {
    const i = await eduService.deleteEducation(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Education entry not found' });
    ok(res, null, 'Education deleted');
  } catch (e) { next(e); }
};
