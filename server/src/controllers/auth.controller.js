import * as authService from '../services/auth.service.js';

const success = (res, data, message = 'Success', status = 200) =>
  res.status(status).json({ success: true, data, message });

export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    if (result.error) return res.status(result.code).json({ success: false, message: result.error });
    success(res, result, 'Login successful');
  } catch (err) { next(err); }
};

export const me = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    success(res, user, 'Current user retrieved');
  } catch (err) { next(err); }
};
