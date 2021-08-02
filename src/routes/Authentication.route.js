const { Router } = require("express");
const AuthController = require("../controllers/Auth.controller");

const authRouter = Router({ mergeParams: true });

authRouter.post("/login", AuthController.login);
authRouter.post("/refresh-token", AuthController.refreshToken);

module.exports = authRouter;
