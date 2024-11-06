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
