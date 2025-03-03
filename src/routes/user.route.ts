import { Router } from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  pagination,
  getUsers,
} from "../controller/user.controller";

const userRouter = Router();

// Get all users
userRouter.get("/users", getUsers);
// Get user by ID
userRouter.get("/user/:_id", getUserById);

// Update user by Id
userRouter.put("/user/:_id", updateUser);

// Delete user by Id
userRouter.delete("/user/:_id", deleteUser);

// Create user
userRouter.post("/user/create", createUser);

// Get a quantity of users by a number (Pagination)
userRouter.get("/users/:qty", pagination);

export default userRouter;
