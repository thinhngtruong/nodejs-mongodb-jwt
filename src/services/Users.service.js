const User = require("../models/Users.model");

const createUser = ({ username, password }) => {
	return User.create({
		username,
		password
	})
}

const findUserByUsername = (username) => {
	return User.findOne({ username: username }).exec();
};

const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		User.find({}, (err, arr) => {
			if (err) return reject(err);
			resolve(arr);
		})
	})
}

const findUserById = (userId) => {
	return new Promise((resolve, reject) => {
		User.findById(userId, (err, user) => {
			if (err) return reject(err);
			resolve(user);
		})
	})
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