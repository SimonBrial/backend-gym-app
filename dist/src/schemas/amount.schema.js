"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountSchema = void 0;
const zod_1 = require("zod");
exports.AmountSchema = zod_1.z.object({
    // _id: z.number().int().positive(), // Identificador primario, entero positivo
    cost: zod_1.z
        .number({ message: "El costo de la suscripcion es necesario." })
        .int()
        .positive({ message: "Debe ser un valor positivo." }), // Costo como número entero positivo
    name: zod_1.z
        .string({ message: "El nombre del servicio/plan es requerido." })
        .min(1)
        .max(20, { message: "Supera el limite de caracteres." }), // Nombre con longitud mínima y máxima definida
});
//# sourceMappingURL=amount.schema.js.map