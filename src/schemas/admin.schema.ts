import { z } from "zod";
import { emailSchema, passwordSchema, dniSchema } from "./helper.schema";

// These is just to validate the req.body that will be send (Response) or has been received (Request)

export const AdminSchema = z.object({
  adminDni: dniSchema,
  name: z
    .string({ message: "El nombre es requerido!" })
    .max(30, { message: "El nombre supera la cantidad maxima de caracteres" }),
  lastName: z
    .string({ message: "El apellido es requerido!" })
    .max(30, { message: "El apellido supera la cantidad maxima de caracteres" }),
  email: emailSchema,
  password: passwordSchema,
  hasPermissions: z
    .boolean({
      message:
        "Indicar si el perfil que se esta creando, tiene permisos de administrador o no",
    })
    .default(true),
  isDeleted: z.boolean().default(false),
});
/* export const AdminOutputSchema = z.object({
  _id: z.parseInt).optional(),
  adminDni: z.string().max(15),
  name: z.string().max(30),
  lastName: z.string().max(30),
  email: z.string().email().max(50),
  password: z.string().max(50),
  hasPermissions: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}); */

type AdminInput = z.infer<typeof AdminSchema>;
// type AdminOutput = z.infer<typeof AdminOutputSchema>;
export type { AdminInput /*, AdminOutput */ };
