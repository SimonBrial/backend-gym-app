import { z } from "zod";

export const InvoiceSchema = z.object({
  invoiceId: z.string().min(1).max(50), // ID de factura, longitud definida
  userDni: z.string().min(1).max(15).regex(/^\w+$/), // DNI del usuario con formato válido
  userName: z.string().min(1).max(30), // Nombre del usuario, longitud definida
  userLastName: z.string().min(1).max(30), // Apellido del usuario, longitud definida
  trainerDni: z.string().max(50).optional().default("No asignado"), // DNI opcional del entrenador con valor por defecto
  trainerName: z.string().max(30).optional().default("No asignado"), // Nombre opcional del entrenador con valor por defecto
  trainerLastName: z.string().max(30).optional().default("No asignado"), // Apellido opcional del entrenador con valor por defecto
  firstDate: z.date(), // Primera fecha, debe ser válida
  lastDate: z.date(), // Última fecha, debe ser válida
  amount: z.number().int().nonnegative().default(0), // Cantidad como entero no negativo
  plan: z.enum(["monthly", "weekly", "daily"]), // Opciones válidas para el plan
});

type InvoiceInput = z.infer<typeof InvoiceSchema>;
export type { InvoiceInput };