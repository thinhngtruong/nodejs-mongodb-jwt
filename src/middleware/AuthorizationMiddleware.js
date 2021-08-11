function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const account = req.user;
    // Authorize based on user role
    if (account) {
      if (roles.length && !account?.roles.join('|').includes(roles.join('|'))) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: 'Cannot access the resources.' });
      }
      next();
    } else {
      return res.status(401).json({
        message: 'Cannot access the resources.',
      });
    }
  };
}

module.exports = {
  authorize,
};