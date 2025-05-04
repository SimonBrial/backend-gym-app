"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRouter = (0, express_1.Router)();
// READ all users
userRouter.get("/users", user_controller_1.getUsers);
// READ user by ID
userRouter.get("/user/:_id", user_controller_1.getUserById);
// CREATE user
userRouter.post("/user/create", user_controller_1.createUser);
// UPDATE user by Id
userRouter.put("/user/u/:_id", user_controller_1.updateUser);
// DELETE user by Id
userRouter.delete("/user/d/:_id", user_controller_1.deleteUser);
// Get a quantity of users by a Number (Pagination)
// userRouter.get("/users/:qty", pagination);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map