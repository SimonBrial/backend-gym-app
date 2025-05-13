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

// TODO: READ all users
userRouter.get("/users", getUsers);

// TODO: READ user by ID
userRouter.get("/user/:_id", getUserById);

// TODO: CREATE user
userRouter.post("/user/create", createUser);

// TODO: UPDATE user by Id
userRouter.put("/user/u/:_id", updateUser);

// TODO: DELETE user by Id
userRouter.delete("/user/d/:_id", deleteUser);

// Get a quantity of users by a Number (Pagination)
// userRouter.get("/users/:qty", pagination);

export default userRouter;
