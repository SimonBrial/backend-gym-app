"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.updateAdmin = exports.createAdmin = exports.getAdminById = exports.hardDeleteAdmin = void 0;
const admin_model_1 = require("../models/admin.model");
const ErrorHandler_1 = require("../helpers/ErrorHandler");
// READ all admins
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Searching all admins
        const admins = yield admin_model_1.AdminModel.findAll({
            where: { isDeleted: false },
        });
        // if not found admins in the DDBB.
        if (!admins || admins.length === 0) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontraron administradores en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Administradores encontrados",
            data: admins,
        };
        res.status(201).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getAdmins = getAdmins;
// READ user by ID
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Read the ?id from the request parameters
        const { _id } = req.params;
        console.log("Received ID:", _id);
        const adminId = parseInt(_id);
        // if _id in not found
        if (!_id || isNaN(adminId)) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontró el id del administrador",
            }, res);
        }
        // Searching admin by id
        const admin = yield admin_model_1.AdminModel.findOne({
            where: { _id: adminId, isDeleted: false },
        });
        // if not found admin in the DDBB.
        if (!admin) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontró el administrador en la base de datos",
            }, res);
        }
        const dataResponse = {
            status: "success",
            message: "Administrador creado correctamente",
            data: admin,
        };
        res.status(201).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.getAdminById = getAdminById;
// CREATE admin
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Read the body from the request
        const adminBody = req.body;
        console.log("Received body:", adminBody);
        // if _id in not found
        if (!adminBody) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 400, message: "El cuerpo de la solicitud está vacío" }, res);
        }
        const { hasPermissions, isDeleted, lastName, password, adminDni, email, name, } = adminBody;
        const allAdmins = (yield admin_model_1.AdminModel.findAll()).map((admin) => admin.toJSON());
        const sameAdmin = allAdmins.filter((admin) => {
            if (admin.adminDni === adminDni && admin.isDeleted === false) {
                return admin;
            }
        });
        const totalAdmins = allAdmins.length;
        if (sameAdmin && sameAdmin.length > 0) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 409, message: "Ya existe un admin con ese DNI" }, res);
        }
        // Creating new admin
        const newAdmin = {
            _id: totalAdmins + 1,
            adminDni,
            name,
            lastName,
            email,
            password,
            hasPermissions,
            isDeleted,
        };
        const data = yield admin_model_1.AdminModel.create(newAdmin);
        // console.log("---> data:", data);
        // Admin created
        const dataResponse = {
            status: "success",
            message: "Administrador creado correctamente",
            data: data,
        };
        res.status(201).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.createAdmin = createAdmin;
// UPDATE admin by ID
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id || !req.body) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "Problemas con la solicitud." }, res);
        }
        const adminId = parseInt(_id);
        const adminFound = (yield admin_model_1.AdminModel.findOne({
            where: { _id: adminId, isDeleted: false },
        }));
        if (!adminFound) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontró el administrador en la base de datos",
            }, res);
        }
        console.log("adminFound --> ", adminFound);
        const { hasPermissions, isDeleted, lastName, adminDni, password, email, name, } = req.body;
        const adminUpdated = {
            _id: adminId,
            hasPermissions,
            isDeleted,
            lastName,
            adminDni,
            password,
            email,
            name,
        };
        adminFound.set(adminUpdated);
        yield adminFound.save();
        const dataResponse = {
            status: "success",
            message: "el administrado ha sido actualizado satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.updateAdmin = updateAdmin;
// UPDATE admin by ID
/* const updateAdminPermissions = async (
  req: Request,
  res: Response,
): Promise<void> => {}; */
// DELETE (HARD) user by ID
const hardDeleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id || !parseInt(_id)) {
            return (0, ErrorHandler_1.ErrorHandler)({ statusCode: 404, message: "No fue suministrada un id del administrador" }, res);
        }
        const adminId = parseInt(_id);
        const adminToDelete = yield admin_model_1.AdminModel.findOne({
            where: { _id: adminId, isDeleted: false },
        });
        if (!adminToDelete) {
            return (0, ErrorHandler_1.ErrorHandler)({
                statusCode: 404,
                message: "No se encontró el administrador en la base de datos",
            }, res);
        }
        yield adminToDelete.destroy();
        const dataResponse = {
            status: "success",
            message: "el administrador ha sido eliminado satisfactoriamente!",
            data: null,
        };
        res.status(200).json(dataResponse);
    }
    catch (err) {
        console.log(err);
        return (0, ErrorHandler_1.ErrorHandler)({
            statusCode: 400,
            message: "la solicitud no ha podido ser gestionada adecuadamente.",
        }, res);
    }
});
exports.hardDeleteAdmin = hardDeleteAdmin;
//# sourceMappingURL=admin.controller.js.map