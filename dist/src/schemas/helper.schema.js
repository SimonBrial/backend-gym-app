"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dniSchema = exports.passwordSchema = exports.emailSchema = exports.passwordValidation = void 0;
const zod_1 = require("zod");
const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*-]).{8,}$/);
exports.passwordValidation = passwordValidation;
const emailSchema = zod_1.z.string().email({
    message: "Correo invalido, debe cumplir con la estructura de correo <email>@<dominio>",
});
exports.emailSchema = emailSchema;
const passwordSchema = zod_1.z
    .string()
    .min(8, {
    message: "La debe contener un minimo de 8 caracteres alfanumericos",
})
    .regex(passwordValidation, {
    message: "El password debe contener al menos un caracter de estos: #?!@$%^&*-, numeros del 0 -9, al menos una mayuscula y una minuscula",
});
exports.passwordSchema = passwordSchema;
const dniFormat = /^[VE][0-9]{8}$/;
const RIFFormat = /^RIF-[0-9]{8}[0-9]$/;
const dniSchema = zod_1.z
    .string({ message: "No puede estar vacio" })
    .max(15, { message: "El DNI no puede tener mas de 15 caracteres" })
    .refine((value) => dniFormat.test(value) || RIFFormat.test(value), {
    message: "Formato no válido. Debe ser una cédula o RIF con formato valido.",
});
exports.dniSchema = dniSchema;
//# sourceMappingURL=helper.schema.js.map