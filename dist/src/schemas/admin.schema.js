"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
const zod_1 = require("zod");
const helper_schema_1 = require("./helper.schema");
// These is just to validate the req.body that will be send (Response) or has been received (Request)
exports.AdminSchema = zod_1.z.object({
    adminDni: helper_schema_1.dniSchema,
    name: zod_1.z
        .string({ message: "El nombre es requerido!" })
        .max(30, { message: "El nombre supera la cantidad maxima de caracteres" }),
    lastName: zod_1.z
        .string({ message: "El apellido es requerido!" })
        .max(30, { message: "El apellido supera la cantidad maxima de caracteres" }),
    email: helper_schema_1.emailSchema,
    password: helper_schema_1.passwordSchema,
    hasPermissions: zod_1.z
        .boolean({
        message: "Indicar si el perfil que se esta creando, tiene permisos de administrador o no",
    })
        .default(true),
    isDeleted: zod_1.z.boolean().default(false),
});
//# sourceMappingURL=admin.schema.js.map