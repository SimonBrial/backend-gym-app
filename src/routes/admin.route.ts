import { Router } from "express";
import {
  // updateAdminPermissions,
  // softDeleteAdmin,
  hardDeleteAdmin,
  getAdminById,
  updateAdmin,
  createAdmin,
  getAdmins,
} from "../controller/admin.controller";

const adminRouter = Router();

// TODO: READ all admins
adminRouter.get("/admins", getAdmins);

// TODO: READ admin by ID
adminRouter.get("/admin/:_id", getAdminById);

// TODO: CREATE admin
adminRouter.post("/admin/create", createAdmin);

// TODO: UPDATE admin by Id
adminRouter.put("/admin/u/:_id", updateAdmin);

// TODO: UPDATE PERMISSIONS admin by Id
// adminRouter.patch("/admin/u/p/:_id", updateAdminPermissions);

// TODO: DELETE (HARD) admin by Id ("/admin/d/hard/:_id")
adminRouter.delete("/admin/d/:_id", hardDeleteAdmin);

// DELETE (SOFT) admin by Id
// adminRouter.delete("/admin/d/soft/:_id", softDeleteAdmin);

export default adminRouter;
