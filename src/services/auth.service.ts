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
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send('Non autorisé');
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    console.log('here');
    res.status(401);
    res.send('Non autorisé');
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send('Non autorisé');
    return;
  }
};
