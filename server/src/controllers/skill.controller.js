import * as skillService from '../services/skill.service.js';
const ok = (res, d, m = 'Success', s = 200) => res.status(s).json({ success: true, data: d, message: m });

export const getAll = async (req, res, next) => {
  try { ok(res, await skillService.getAllSkills(req.query), 'Skills retrieved'); }
  catch (e) { next(e); }
};
export const getById = async (req, res, next) => {
  try {
    const i = await skillService.getSkillById(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Skill not found' });
    ok(res, i, 'Skill retrieved');
  } catch (e) { next(e); }
};
export const create = async (req, res, next) => {
  try { ok(res, await skillService.createSkill(req.body), 'Skill created', 201); }
  catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try {
    const i = await skillService.updateSkill(req.params.id, req.body);
    if (!i) return res.status(404).json({ success: false, message: 'Skill not found' });
    ok(res, i, 'Skill updated');
  } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try {
    const i = await skillService.deleteSkill(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Skill not found' });
    ok(res, null, 'Skill deleted');
  } catch (e) { next(e); }
};
