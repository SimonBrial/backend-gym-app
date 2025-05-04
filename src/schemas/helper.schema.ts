import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/,
);

const emailSchema = z.string().email({
  message:
    "Correo invalido, debe cumplir con la estructura de correo <email>@<dominio>",
});

const passwordSchema = z
  .string()
  .min(8, {
    message: "La debe contener un minimo de 8 caracteres alfanumericos",
  })
  .regex(passwordValidation, {
    message:
      "El password debe contener al menos un caracter de estos: #?!@$%^&*-, numeros del 0 -9, al menos una mayuscula y una minuscula",
  });

const dniFormat = /^[VE][0-9]{8}$/;
const RIFFormat = /^RIF-[0-9]{8}[0-9]$/;

const dniSchema = z
  .string({ message: "No puede estar vacio" })
  .max(15, { message: "El DNI no puede tener mas de 15 caracteres" })
  .refine((value) => dniFormat.test(value) || RIFFormat.test(value), {
    message: "Formato no válido. Debe ser una cédula o RIF con formato valido.",
  });

export { passwordValidation, emailSchema, passwordSchema, dniSchema };
