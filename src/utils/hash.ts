import * as bcrypt from 'bcrypt';

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
