const { Router } = require("express");
const userController = require("../controllers/Users.controller");

const userRouter = Router({ mergeParams: true });

userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:userId", userController.findById);
userRouter.get("/:username", userController.findByUsername);
userRouter.delete("/:userId", userController.deleteById);

module.exports = userRouter;
