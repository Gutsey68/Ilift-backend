import jwt from 'jsonwebtoken';
import { findRefreshTokenByUserId } from '../services/auth.service';

export const refresh = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, 'refreshSecret');

    const refreshStored = await findRefreshTokenByUserId(decodedToken.user.id);

    if (token != refreshStored) {
      return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
    }

    req.refreshPayload = { id: decodedToken.user.id, pseudo: decodedToken.user.pseudo };

    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
  }
};
