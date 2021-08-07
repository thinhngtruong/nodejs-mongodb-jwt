const express = require("express");
const router = express.Router();
const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");
const authRouter = require("./Auth.route");
const tasksRouter = require("./Tasks.route");
const usersRouter = require("./Users.route");
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

// Config swagger
const swaggerFile = (process.cwd() + "/swagger/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const customCss = fs.readFileSync((process.cwd() + "/swagger/swagger.css"), 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
	// Lists Public API
	router.use("/authentication", authRouter);

	router.use("/users", usersRouter);

	// API docs
	router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, null, null, customCss));

	router.use(AuthenticationMiddleware.isAuth);

	// List Protected APIs:
	router.use("/tasks", tasksRouter);

	return app.use("/api", router);
}

module.exports = initAPIs;