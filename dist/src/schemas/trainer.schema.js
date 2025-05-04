"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerSchema = void 0;
const zod_1 = require("zod");
exports.TrainerSchema = zod_1.z.object({
    trainerDni: zod_1.z.string().min(1).max(15).regex(/^\w+$/), // DNI no vacío, longitud definida
    name: zod_1.z
        .string({ message: "El nombre es requerido!" })
        .min(1)
        .max(30, { message: "El nombre supera la cantidad de caracteres" }),
    lastName: zod_1.z
        .string({ message: "El apellido es requerido!" })
        .min(1)
        .max(30, { message: "El apellido supera la cantidad de caracteres" }),
    age: zod_1.z
        .number({ message: "La edad es requerida" })
        .int({ message: "No esta permitido decimales, solo numeros enteros" })
        .positive({ message: "no esta permitido numero negativos" }), // Edad debe ser un número entero positivo
    area: zod_1.z
        .string()
        .max(20, { message: "Superado el limite de caracteres" })
        .optional()
        .default("No indicado"), // Área opcional con valor por defecto
    assignedClients: zod_1.z.array(zod_1.z.string()).optional().default([]), // Array de strings opcional
});
//# sourceMappingURL=trainer.schema.js.map