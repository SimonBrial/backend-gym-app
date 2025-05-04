import { z } from "zod";
import { dniSchema } from "./helper.schema";

export const UserSchema = z.object({
  userDni: dniSchema,
  name: z
    .string({ message: "El nombre es requerido!." })
    .min(1)
    .max(30, { message: "El nombre supera la cantidad de caracteres." }),
  lastName: z
    .string({ message: "El apellido es requerido!." })
    .min(1)
    .max(30, { message: "El apellido supera la cantidad de caracteres." }),
  weight: z
    .number({ message: "El peso debe estar definido." })
    .int()
    .positive({ message: "No se aceptan valores negativos." }),
  age: z
    .number({ message: "La edad debe estar definida." })
    .int()
    .positive({ message: "No se aceptan valores negativos." }),
  plan: z.enum(["monthly", "weekly", "daily"], {
    message: "Debe indicar un tipo de suscripcion a usar.",
  }),
  registrationDate: z.date(),
  lastPayment: z.date(),
  daysOfDebt: z.number().int().nonnegative(),
  trainerId: z.number().optional().default(0),
  trainerDni: dniSchema.optional().default("No asignado"),
  trainerName: z
    .string({ message: "El nombre es requerido!." })
    .min(1)
    .max(30, { message: "El nombre supera la cantidad de caracteres." })
    .optional()
    .default("No asignado"), // Nombre del entrenador
  lastUpdate: z.date(),
  invoicesArray: z.array(z.string()).optional().default([]), // Lista de strings, opcional
});

type UserInput = z.infer<typeof UserSchema>;
export type { UserInput };
