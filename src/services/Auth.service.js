const User = require("../models/Users.model");

const findUserByUsername = async (username) => {
	return User.findOne({ username });
};

module.exports = {
	findUserByUsername,
};