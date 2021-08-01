const jwtHelper = require("../helpers/JWT.helper");
const userService = require("../services/Users.service");
const {
	ACCESS_TOKEN_LIFE,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_LIFE,
    REFRESH_TOKEN_SECRET
} = require("../config/JWT.config");

const create = (req, res, next) => {
	const { username, password } = req.body;
	if (!username) {
		res.status(400).json({ message: "Please not enter empty string username" });
		return;
	}
	if (!password) {
		res.status(400).json({ message: "Please not enter empty string password" });
		return;
	}
	userService
		.findUserByUsername(username)
		.then(foundUser => {
			if (foundUser) {
				res.status(400).json({ message: "Username is existing" });
				return next();
			}

			return userService.createUser({ username, password }).then(async (user) => {
				const accessToken = await jwtHelper.generateToken(user.toJSON(), ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
				const refreshToken = await jwtHelper.generateToken(user.toJSON(), REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);

				return res.status(200).json({ accessToken, refreshToken });
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		});
}

const findAll = (req, res) => {
	userService
		.getAllUsers()
		.then(userList => res.json(userList))
		.catch(err => {
			res.send(err);
		});
};

const findById = async (req, res) => {
	const { userId } = req.params;
	userService
		.findUserById(userId)
		.then(user => {
			res.json(user);
		})
		.catch(err => res.send(err));
};

module.exports = {
	create,
	findAll,
	findById
}