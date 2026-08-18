import { ContactMessage } from '../models/ContactMessage.model.js';

export const getAllMessages = async (query = {}) => {
  const { status } = query;
  const filter = {};
  if (status) filter.status = status;
  return ContactMessage.find(filter).sort({ createdAt: -1 });
};

export const createMessage = async (data) => ContactMessage.create(data);

export const updateMessageStatus = async (id, status) => {
  const allowed = ['new', 'read', 'archived'];
  if (!allowed.includes(status)) return { error: 'Invalid status', code: 400 };
  const msg = await ContactMessage.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  return msg;
};

export const getMessageById = (id) => ContactMessage.findById(id);
export const deleteMessage = (id) => ContactMessage.findByIdAndDelete(id);
