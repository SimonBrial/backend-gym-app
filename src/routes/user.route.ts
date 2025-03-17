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

// UPDATE user by Id
userRouter.put("/user/u/:_id", updateUser);

// DELETE user by Id
userRouter.delete("/user/d/:_id", deleteUser);

// CREATE user
userRouter.post("/user/create", createUser);

// Get a quantity of users by a number (Pagination)
// userRouter.get("/users/:qty", pagination);

export default userRouter;
