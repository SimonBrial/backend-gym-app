"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const helper_schema_1 = require("./helper.schema");
exports.UserSchema = zod_1.z.object({
    userDni: helper_schema_1.dniSchema,
    name: zod_1.z
        .string({ message: "El nombre es requerido!." })
        .min(1)
        .max(30, { message: "El nombre supera la cantidad de caracteres." }),
    lastName: zod_1.z
        .string({ message: "El apellido es requerido!." })
        .min(1)
        .max(30, { message: "El apellido supera la cantidad de caracteres." }),
    weight: zod_1.z
        .number({ message: "El peso debe estar definido." })
        .int()
        .positive({ message: "No se aceptan valores negativos." }),
    age: zod_1.z
        .number({ message: "La edad debe estar definida." })
        .int()
        .positive({ message: "No se aceptan valores negativos." }),
    plan: zod_1.z.enum(["monthly", "weekly", "daily"], {
        message: "Debe indicar un tipo de suscripcion a usar.",
    }),
    registrationDate: zod_1.z.date(),
    lastPayment: zod_1.z.date(),
    daysOfDebt: zod_1.z.number().int().nonnegative(),
    trainerId: zod_1.z.number().optional().default(0),
    trainerDni: helper_schema_1.dniSchema.optional().default("No asignado"),
    trainerName: zod_1.z
        .string({ message: "El nombre es requerido!." })
        .min(1)
        .max(30, { message: "El nombre supera la cantidad de caracteres." })
        .optional()
        .default("No asignado"), // Nombre del entrenador
    lastUpdate: zod_1.z.date(),
    invoicesArray: zod_1.z.array(zod_1.z.string()).optional().default([]), // Lista de strings, opcional
});
//# sourceMappingURL=user.schema.js.map