import { env } from '../config/env.js';

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const payload = {
    success: false,
    message: err.message || 'Internal server error',
  };
  if (err.name === 'ValidationError') {
    payload.message = 'Validation failed';
    payload.errors = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400);
  }
  if (err.name === 'CastError') {
    payload.message = `Invalid ${err.path || 'identifier'} format`;
    res.status(400);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {}).join(', ');
    payload.message = `Duplicate value for field(s): ${field}`;
    res.status(409);
  }
  if (env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }
  res.json(payload);
};
