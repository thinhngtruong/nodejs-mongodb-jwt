const express = require("express");
const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const authRouter = require("./Auth.route");
const tasksRouter = require("./Tasks.route");
const usersRouter = require("./Users.route");
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
	// Lists Public API
	router.use("/authentication", authRouter);
	router.use("/users", usersRouter);
	router.use(AuthMiddleWare.isAuth);

	// List Protected APIs:
	router.use("/tasks", tasksRouter);
	return app.use("/api", router);
}

module.exports = initAPIs;