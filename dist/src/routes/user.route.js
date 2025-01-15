"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
// Get all users
userRouter.get("/users", user_controller_1.getUsers);
// Get user by ID
userRouter.get("/user/:id", user_controller_1.getUserById);
// Update user by Id
userRouter.put("/user/:id", user_controller_1.updateUsers);
// Delete user by Id
userRouter.delete("/user/:id", user_controller_1.deleteUsers);
// Create user
userRouter.post("/user", user_controller_1.createUsers);
// Get a quantity of users by a number (Pagination)
userRouter.get("/users/:qty", user_controller_1.pagination);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map