import { Request, Response } from "express";

// Get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: any = [];
    res.json({ res: "API it's working", users: users });
  } catch (err) {
    console.log(err);
  }
};
// Get user By Id
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Get by ID", id: crypto.randomUUID() });
  } catch (err) {
    console.log(err);
  }
};

// Update user by Id
const updateUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Updating user" });
  } catch (err) {
    console.log(err);
  }
};
// Delete user by Id
const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Deleting user" });
  } catch (err) {
    console.log(err);
  }
};
// Create user
const createUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Creating user" });
  } catch (err) {
    console.log(err);
  }
};
// Get a quantity of users by a number (Pagination)
const pagination = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ res: "Pagination", qty: 20 });
  } catch (err) {
    console.log(err);
  }
};
// Authenticate user with JWT Token

export {
  createUsers,
  getUserById,
  updateUsers,
  deleteUsers,
  pagination,
  getUsers,
};
