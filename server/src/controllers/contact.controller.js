import * as contactService from '../services/contact.service.js';
const ok = (res, d, m = 'Success', s = 200) => res.status(s).json({ success: true, data: d, message: m });

export const getAll = async (req, res, next) => {
  try { ok(res, await contactService.getAllMessages(req.query), 'Messages retrieved'); }
  catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const item = await contactService.createMessage({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      status: 'new',
    });
    ok(res, item, 'Message sent successfully. I will get back to you soon.', 201);
  } catch (e) { next(e); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const result = await contactService.updateMessageStatus(req.params.id, req.body.status);
    if (result.error) return res.status(result.code).json({ success: false, message: result.error });
    if (!result) return res.status(404).json({ success: false, message: 'Message not found' });
    ok(res, result, 'Message status updated');
  } catch (e) { next(e); }
};

export const getById = async (req, res, next) => {
  try {
    const i = await contactService.getMessageById(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Message not found' });
    ok(res, i, 'Message retrieved');
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const i = await contactService.deleteMessage(req.params.id);
    if (!i) return res.status(404).json({ success: false, message: 'Message not found' });
    ok(res, null, 'Message deleted');
  } catch (e) { next(e); }
};
