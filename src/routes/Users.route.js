const { Router } = require('express');
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');
const AuthorizationMiddleware = require('../middleware/AuthorizationMiddleware');
const UploadMiddleware = require('../middleware/UploadMiddleware');
const ROLES = require('../helpers/Role.helper').ROLES;
const userController = require('../controllers/Users.controller');

const userRouter = Router({ mergeParams: true });

userRouter.post('/', UploadMiddleware.single('image'), userController.create);
userRouter.get('/', userController.findAll);
userRouter.patch('/:username',
  [AuthenticationMiddleware.isAuth, AuthorizationMiddleware.authorize(ROLES.MODERATOR)],
  userController.updateRoleByUsername);
userRouter.get('/:username',
  [AuthenticationMiddleware.isAuth, AuthorizationMiddleware.authorize(ROLES.ADMIN)],
  userController.findByUsername);
userRouter.get('/:userId',
  [AuthenticationMiddleware.isAuth, AuthorizationMiddleware.authorize(ROLES.MODERATOR)],
  userController.findById);
userRouter.delete('/:userId',
  [AuthenticationMiddleware.isAuth, AuthorizationMiddleware.authorize(ROLES.ADMIN)],
  userController.deleteById);

module.exports = userRouter;
