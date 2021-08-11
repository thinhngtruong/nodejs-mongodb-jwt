const User = require('../models/Users.model');
const Role = require('../models/Roles.model');

const createUser = async ({ username, password, image }) => {
  return User.create({
    username,
    password,
    image
  });
};

const setRolesForUser = async (user, userRoles = []) => {
  if (typeof userRoles === 'string') {
    userRoles = [userRoles];
  }
  if (userRoles.length) {
    return new Promise(async (resolve, reject) => {
      try {
        const roles = await Role.find({ name: { $in: userRoles } });
        user.roles = roles.map(role => role._id);
        const updatedUser = await user.save();
        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await Role.findOne({ name: 'user' });
        user.roles = [role._id];
        const updatedUser = await user.save();
        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  }
};

const findUserByUsername = async (username) => {
  return User.findOne({ username: username }, '-password').populate('roles', 'name');
};

const getAllUsers = async () => {
  return User.find({}, '-password').populate('roles', 'name');
};

const findUserById = async (userId) => {
  return User.findById(userId, '-password').populate('roles', 'name');
};

const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId)
      .then((user) => {
        if (user)
          resolve(user);
        else
          reject('User doesn\'t exist.');
      })
      .catch((error) => reject(error));
  });
};

module.exports = {
  createUser,
  setRolesForUser,
  getAllUsers,
  deleteUserById,
  findUserByUsername,
  findUserById
};