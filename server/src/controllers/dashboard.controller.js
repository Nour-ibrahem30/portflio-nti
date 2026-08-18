import * as dashboardService from '../services/dashboard.service.js';

export const getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json({ success: true, data: stats, message: 'Dashboard stats retrieved' });
  } catch (e) { next(e); }
};
