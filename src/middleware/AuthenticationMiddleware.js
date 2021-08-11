const jwtHelper = require('../helpers/JWT.helper');
const debug = console.log.bind(console);
// secretKey saved in file or env variable
const { ACCESS_TOKEN_SECRET } = require('../config/JWT.config');
/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
  // Get token from client (usually from header)
  const tokenFromClient = req.body.token || req.query.token || req.headers['authorization'] || req.headers['x-access-token'];
  // If token exists
  if (tokenFromClient) {
    try {
      // Decode & verify token

      const decoded = await jwtHelper.verifyToken(tokenFromClient, ACCESS_TOKEN_SECRET);
      // If token is valid, save token for after actions
      req.user = decoded;
      next();
    } catch (error) {
      // If token is invalid (expired, incorrect, etc..)
      // This line will be removed on production
      debug('Error while verify token:', error);
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};

module.exports = {
  isAuth,
};