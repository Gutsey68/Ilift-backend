import jwt from 'jsonwebtoken';

export const createJWT = user => {
  const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

export const createRefreshToken = user => {
  const refreshToken = jwt.sign({ id: user.id, pseudo: user.pseudo }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return refreshToken;
};
