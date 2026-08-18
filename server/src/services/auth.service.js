import { User } from '../models/User.model.js';
import { signToken } from '../utils/helpers.js';

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) return { error: 'Invalid credentials', code: 401 };
  const ok = await user.comparePassword(password);
  if (!ok) return { error: 'Invalid credentials', code: 401 };
  const token = signToken(user._id);
  const publicUser = user.toObject();
  delete publicUser.password;
  return { token, user: publicUser };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};
