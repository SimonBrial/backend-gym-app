"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
// Get all users
userRouter.get("/users", user_controller_1.getUsers);
// Get user by ID
userRouter.get("/user/:_id", user_controller_1.getUserById);
// UPDATE user by Id
userRouter.put("/user/u/:_id", user_controller_1.updateUser);
// DELETE user by Id
userRouter.delete("/user/d/:_id", user_controller_1.deleteUser);
// CREATE user
userRouter.post("/user/create", user_controller_1.createUser);
// Get a quantity of users by a number (Pagination)
// userRouter.get("/users/:qty", pagination);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map