"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = void 0;
const zod_1 = require("zod");
const helper_schema_1 = require("./helper.schema");
const planEnum = ["monthly", "weekly", "daily"];
exports.InvoiceSchema = zod_1.z.object({
    invoiceId: zod_1.z.string().min(1).max(6), // ID de factura, longitud definida
    userDni: helper_schema_1.dniSchema, // DNI del usuario con formato válido
    userName: zod_1.z
        .string({ message: "El nombre es requerido!." })
        .min(1)
        .max(30, { message: "El nombre supera la cantidad de caracteres." }),
    userLastName: zod_1.z
        .string({ message: "El apellido es requerido!." })
        .min(1)
        .max(30, { message: "El apellido supera la cantidad de caracteres." }),
    trainerDni: zod_1.z.string().max(50).optional().default("No asignado"), // DNI opcional del entrenador con valor por defecto
    trainerName: zod_1.z.string().max(30).optional().default("No asignado"), // Nombre opcional del entrenador con valor por defecto
    trainerLastName: zod_1.z.string().max(30).optional().default("No asignado"), // Apellido opcional del entrenador con valor por defecto
    firstDate: zod_1.z.date(), // Primera fecha, debe ser válida
    lastDate: zod_1.z.date(), // Última fecha, debe ser válida
    amount: zod_1.z.number().int().positive().default(0), // Cantidad como entero no negativo
    plan: zod_1.z.enum(planEnum, {
        errorMap: () => ({
            message: "Por favor seleccionar un una suscripcion.",
        }),
    }),
});
/*
TODO: User dni structure-- > V / E / RIF - 99.999.999 - 9(the last Number is in the case of the user gives the rif Number)
TODO: V/E - 99.999.999
TODO: RIF - 99.999.999 - 9
*/ 
//# sourceMappingURL=invoice.schema.js.map