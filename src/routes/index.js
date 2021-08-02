const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/Auth.controller");
const tasksRouter = require("./Tasks.route");
const usersRouter = require("./Users.route");
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
	router.post("/login", AuthController.login);
	router.post("/refresh-token", AuthController.refreshToken);
	router.use("/users", usersRouter);
	router.use(AuthMiddleWare.isAuth);
	
	router.use("/tasks", tasksRouter);
	// List Protect APIs:
	return app.use("/api", router);
}

module.exports = initAPIs;