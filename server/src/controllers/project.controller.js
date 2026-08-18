import * as projectService from '../services/project.service.js';

const ok = (res, data, message = 'Success', status = 200) =>
  res.status(status).json({ success: true, data, message });

export const getAll = async (req, res, next) => {
  try {
    const items = await projectService.getAllProjects(req.query);
    ok(res, items, `${items.length} project(s) retrieved`);
  } catch (err) { next(err); }
};

export const getBySlug = async (req, res, next) => {
  try {
    const item = await projectService.getProjectBySlug(req.params.slug);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    ok(res, item, 'Project retrieved');
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await projectService.getProjectById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    ok(res, item, 'Project retrieved');
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const item = await projectService.createProject(req.body);
    ok(res, item, 'Project created', 201);
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const item = await projectService.updateProject(req.params.id, req.body);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    ok(res, item, 'Project updated');
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const item = await projectService.deleteProject(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Project not found' });
    ok(res, null, 'Project deleted');
  } catch (err) { next(err); }
};
