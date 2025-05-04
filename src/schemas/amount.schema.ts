import { z } from "zod";

export const AmountSchema = z.object({
  // _id: z.number().int().positive(), // Identificador primario, entero positivo
  cost: z
    .number({ message: "El costo de la suscripcion es necesario." })
    .int()
    .positive({ message: "Debe ser un valor positivo." }), // Costo como número entero positivo
  name: z
    .string({ message: "El nombre del servicio/plan es requerido." })
    .min(1)
    .max(20, { message: "Supera el limite de caracteres." }), // Nombre con longitud mínima y máxima definida
});

type AmountInput = z.infer<typeof AmountSchema>;
export type { AmountInput };
