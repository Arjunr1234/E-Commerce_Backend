

import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = '15m') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  };