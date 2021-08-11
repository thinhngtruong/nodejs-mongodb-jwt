const ACCESS_TOKEN_LIFE = process.env.ACCESS_TOKEN_LIFE || '1h';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret-token-thinhnguyen';
const REFRESH_TOKEN_LIFE = process.env.REFRESH_TOKEN_LIFE || '3650d'; // 10 years
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'secret-token-thinhnguyen';

module.exports = {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET
};