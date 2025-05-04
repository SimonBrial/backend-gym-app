import { Router } from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  // pagination,
  getUsers,
} from "../controller/user.controller";

const userRouter = Router();

// READ all users
userRouter.get("/users", getUsers);

// READ user by ID
userRouter.get("/user/:_id", getUserById);

// CREATE user
userRouter.post("/user/create", createUser);

// UPDATE user by Id
userRouter.put("/user/u/:_id", updateUser);

// DELETE user by Id
userRouter.delete("/user/d/:_id", deleteUser);

// Get a quantity of users by a Number (Pagination)
// userRouter.get("/users/:qty", pagination);

export default userRouter;
