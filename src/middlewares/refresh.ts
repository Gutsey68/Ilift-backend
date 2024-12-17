import jwt from 'jsonwebtoken';
import { findRefreshTokenByUserId } from '../services/auth.service';

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.headers.authorization.split(' ')[1];

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const refreshStored = await findRefreshTokenByUserId(payload.id);

    if (refreshToken !== refreshStored.token) {
      return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
    }

    req.refreshPayload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
  }
};
