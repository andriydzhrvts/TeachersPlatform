const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (data) => {
  bcrypt.hash(data.password, 10, (err, hashedPass) => {
    if (err) {
      throw new Error('Something went wrong');
    }

    User.create({
      role: data.role,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      password: hashedPass,
    });
  });
};

const findByEmail = async (email) => await User.findOne({ email });

const login = async (data) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User was not found!');
  }

  const passwords = await comparePasswords(password, user.password);
  if (!passwords) {
    throw new Error('Password do not match');
  }

  return jwt.sign({ email: user.email }, 'secretValue', { expiresIn: '1h' });
};

const comparePasswords = (pass1, pass2) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(pass1, pass2, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

module.exports = { register, login, findByEmail };
