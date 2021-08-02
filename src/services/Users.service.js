const User = require("../models/Users.model");

// TODO: hash password
const createUser = async ({ username, password }) => {
	return User.create({
		username,
		password
	})
}

const findUserByUsername = async (username) => {
	return User.findOne({ username: username }).exec();
};

const getAllUsers = async () => {
	return User.find({});
}

const findUserById = async (userId) => {
	return User.findById(userId);
}

const deleteUserById = (userId) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndRemove(userId)
			.then((user) => {
				if (user)
					resolve(user)
				else
					reject("User doesn't exist.")
			})
			.catch((error) => reject(error));
	});
}

module.exports = {
	createUser,
	getAllUsers,
	deleteUserById,
	findUserByUsername,
	findUserById
}