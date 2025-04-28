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

export { passwordValidation, emailSchema, passwordSchema };
