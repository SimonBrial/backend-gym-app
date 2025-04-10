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
Object.defineProperty(exports, "__esModule", { value: true });
// READ amounts
const getAmounts = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () { });
// READ amount by name
const getAmountName = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () { });
// READ amounts
const updateAmount = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = { getAmounts, getAmountName, updateAmount };
//# sourceMappingURL=amout.controller.js.map