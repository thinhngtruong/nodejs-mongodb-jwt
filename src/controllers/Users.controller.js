const jwtHelper = require("../helpers/JWT.helper");
const userService = require("../services/Users.service");
const {
	ACCESS_TOKEN_LIFE,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_LIFE,
	REFRESH_TOKEN_SECRET
} = require("../config/JWT.config");

const create = async (req, res, next) => {
	const { username, password } = req.body;
	if (!username) {
		return res.status(400).json({ message: "Please not enter empty string username" });
	}
	if (!password) {
		return res.status(400).json({ message: "Please not enter empty string password" });
	}

	try {
		const foundUser = await userService.findUserByUsername(username);
		if (foundUser) {
			res.status(400).json({ message: "Username is existing" });
			return next();
		}

		return userService.createUser({ username, password }).then(async (user) => {
			const accessToken = await jwtHelper.generateToken(user.toJSON(), ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
			const refreshToken = await jwtHelper.generateToken(user.toJSON(), REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);

			return res.status(200).json({ accessToken, refreshToken });
		});
	} catch (err) {
		next(err)
	}
}

const findAll = async (req, res, next) => {
	try {
		const userList = await userService.getAllUsers();
		res.json(userList);
	} catch (err) {
		next(err)
	}
};

const findById = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await userService.findUserById(userId);
		res.json(user);
	} catch (err) {
		next(err)
	}
};

const findByUsername = async (req, res, next) => {
	const { username } = req.params;
	try {
		const user = await userService.findUserByUsername(username)
		res.json(user);
	} catch (err) {
		next(err)
	}
};

const deleteById = async (req, res, next) => {
	const { userId } = req.params
	try {
		const user = await userService.deleteUserById(userId)
		res.json(user);
	} catch (err) {
		next(err)
	}
};

module.exports = {
	create,
	findAll,
	findById,
	findByUsername,
	deleteById
}