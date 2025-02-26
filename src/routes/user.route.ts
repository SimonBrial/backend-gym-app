import { Router } from "express";
import {
  deleteUsers,
  getUserById,
  updateUsers,
  createUser,
  pagination,
  getUsers,
} from "../controller/user.controller";

const userRouter = Router();

// Get all users
userRouter.get("/users", getUsers);
// Get user by ID
userRouter.get("/user/:id", getUserById);

// Update user by Id
userRouter.put("/user/:id", updateUsers);

// Delete user by Id
userRouter.delete("/user/:id", deleteUsers);

// Create user
userRouter.post("/user", createUser);

// Get a quantity of users by a number (Pagination)
userRouter.get("/users/:qty", pagination);

export default userRouter;
