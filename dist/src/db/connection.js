"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const _1 = __importDefault(require("."));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _1.default.sync({ force: true });
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        handleError(error);
    }
});
const handleError = (error) => {
    // Aquí puedes agregar lógica para manejar diferentes tipos de errores
    // Por ejemplo, errores de conexión, errores de autenticación, etc.
    if (error) {
        console.error("Specific error occurred:", error.message);
    }
    else {
        console.error("An unexpected error occurred:", error);
    }
};
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    // Aquí puedes agregar cualquier lógica adicional necesaria para la conexión
});
exports.connection = connection;
//# sourceMappingURL=connection.js.map