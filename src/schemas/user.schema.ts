import { z } from "zod";

export const UserSchema = z.object({
  userDni: z.string().min(1).max(15).regex(/^\w+$/), // Asegura que sea único y no vacío
  name: z.string().min(1).max(30), // Longitud mínima y máxima
  lastName: z.string().min(1).max(30),
  weight: z.number().int().positive(), // Peso debe ser un número positivo
  age: z.number().int().positive(), // Edad debe ser un entero positivo
  plan: z.enum(["monthly", "weekly", "daily"]), // Opciones válidas para el plan
  registrationDate: z.date(), // Validación para fecha
  lastPayment: z.date(),
  daysOfDebt: z.number().int().nonnegative(), // Número entero no negativo
  trainerId: z.string().length(6).optional().default("000000"), // ID opcional con longitud fija
  trainerDni: z.string().length(10).optional().default("No asignado"), // DNI con longitud definida
  trainerName: z.string().max(50).optional().default("No asignado"), // Nombre del entrenador
  lastUpdate: z.date(),
  invoicesArray: z.array(z.string()).optional().default([]), // Lista de strings, opcional
});

type UserInput = z.infer<typeof UserSchema>;
export type { UserInput };
