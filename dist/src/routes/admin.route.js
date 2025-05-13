"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controller/admin.controller");
const adminRouter = (0, express_1.Router)();
// TODO: READ all admins
adminRouter.get("/admins", admin_controller_1.getAdmins);
// TODO: READ admin by ID
adminRouter.get("/admin/:_id", admin_controller_1.getAdminById);
// TODO: CREATE admin
adminRouter.post("/admin/create", admin_controller_1.createAdmin);
// TODO: UPDATE admin by Id
adminRouter.put("/admin/u/:_id", admin_controller_1.updateAdmin);
// TODO: UPDATE PERMISSIONS admin by Id
// adminRouter.patch("/admin/u/p/:_id", updateAdminPermissions);
// TODO: DELETE (HARD) admin by Id ("/admin/d/hard/:_id")
adminRouter.delete("/admin/d/:_id", admin_controller_1.hardDeleteAdmin);
// DELETE (SOFT) admin by Id
// adminRouter.delete("/admin/d/soft/:_id", softDeleteAdmin);
exports.default = adminRouter;
//# sourceMappingURL=admin.route.js.map