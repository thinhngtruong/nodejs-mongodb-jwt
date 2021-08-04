const bcrypt = require("bcrypt");

const jwtHelper = require("../helpers/JWT.helper");
const authService = require("../services/Auth.service");
const {
	ACCESS_TOKEN_LIFE,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_LIFE,
	REFRESH_TOKEN_SECRET
} = require("../config/JWT.config");

let tokenList = {};

/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await authService.findUserByUsername(username);
		const validPassword = await bcrypt.compare(password, user?.password || '');
		if (!user || !validPassword) {
			return res.status(403).json({ message: "Wrong user or password" });
		}

		const accessToken = await jwtHelper.generateToken(user.toJSON(), ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE);
		const refreshToken = await jwtHelper.generateToken(user.toJSON(), REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE);

		tokenList[refreshToken] = { accessToken, refreshToken };

		return res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
}
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
	const refreshTokenFromClient = req.body.refreshToken;

	if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
		try {
			const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
			// User data can get by decoded.data
			const user = decoded.data;
			const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
			// Send new token to client
			return res.status(200).json({ accessToken });
		} catch (error) {
			debug(error);
			res.status(403).json({
				message: 'Invalid refresh token.',
			});
		}
	} else {
		return res.status(403).send({
			message: 'No token provided.',
		});
	}
};
module.exports = {
	login,
	refreshToken,
}