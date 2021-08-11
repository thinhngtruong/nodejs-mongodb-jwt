const Role = require('../models/Roles.model');

const ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'USER'
};

function initRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      Object.entries(ROLES).forEach(role => {
        // eslint-disable-next-line no-unused-vars
        const [key, value] = role;
        new Role({
          name: value
        }).save(err => {
          if (err) {
            console.log('error', err);
          } else {
            console.log(`Added ${value} to roles collection successfully`);
          }
        });
      });
    }
  });
}

module.exports = {
  initRoles,
  ROLES
};