import { z } from "zod";
import { dniSchema } from "./helper.schema";

const planEnum = ["monthly", "weekly", "daily"] as const;

export const InvoiceSchema = z.object({
  invoiceId: z.string().min(1).max(6), // ID de factura, longitud definida
  userDni: dniSchema, // DNI del usuario con formato válido
  userName: z
    .string({ message: "El nombre es requerido!." })
    .min(1)
    .max(30, { message: "El nombre supera la cantidad de caracteres." }),
  userLastName: z
    .string({ message: "El apellido es requerido!." })
    .min(1)
    .max(30, { message: "El apellido supera la cantidad de caracteres." }),
  trainerDni: z.string().max(50).optional().default("No asignado"), // DNI opcional del entrenador con valor por defecto
  trainerName: z.string().max(30).optional().default("No asignado"), // Nombre opcional del entrenador con valor por defecto
  trainerLastName: z.string().max(30).optional().default("No asignado"), // Apellido opcional del entrenador con valor por defecto
  firstDate: z.date(), // Primera fecha, debe ser válida
  lastDate: z.date(), // Última fecha, debe ser válida
  amount: z.number().int().positive().default(0), // Cantidad como entero no negativo
  plan: z.enum(planEnum, {
    errorMap: () => ({
      message: "Por favor seleccionar un una suscripcion.",
    }),
  }),
});

type InvoiceInput = z.infer<typeof InvoiceSchema>;
export type { InvoiceInput };


/*
TODO: User dni structure-- > V / E / RIF - 99.999.999 - 9(the last Number is in the case of the user gives the rif Number)
TODO: V/E - 99.999.999
TODO: RIF - 99.999.999 - 9
*/