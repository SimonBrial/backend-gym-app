import { z } from "zod";

export const TrainerSchema = z.object({
  trainerDni: z.string().min(1).max(15).regex(/^\w+$/), // DNI no vacío, longitud definida
  name: z
    .string({ message: "El nombre es requerido!" })
    .max(30, { message: "El nombre supera la cantidad de caracteres" }),
  lastName: z
    .string({ message: "El apellido es requerido!" })
    .max(30, { message: "El apellido supera la cantidad de caracteres" }),
  age: z.number({ message: "La edad es requerida" }).int({message: "No esta permitido decimales, solo numeros enteros"}).positive({message: "no esta permitido numero negativos"}), // Edad debe ser un número entero positivo
  area: z.string().max(20, {message: "Superado el limite de caracteres"}).optional().default("No indicado"), // Área opcional con valor por defecto
  assignedClients: z.array(z.string()).optional().default([]), // Array de strings opcional
});

type TrainerInput = z.infer<typeof TrainerSchema>;
export type { TrainerInput };
