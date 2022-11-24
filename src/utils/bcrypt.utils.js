import bcrypt from 'bcryptjs';

export const encrypt = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}
