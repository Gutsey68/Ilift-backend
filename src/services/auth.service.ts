import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const createJWT = user => {
  const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, process.env.JWT_SECRET);
  return token;
};

export const protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé. Veuillez vous connecter.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = payload;
    next();
  } catch (error) {
    console.error('Token invalide ou expiré:', error);
    return res.status(401).json({ message: 'Token invalide ou expiré. Veuillez vous reconnecter.' });
  }
};

export const logout = res => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0)
  });
};
