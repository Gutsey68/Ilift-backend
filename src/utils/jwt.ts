import jwt from 'jsonwebtoken';

export const createJWT = user => {
  const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
