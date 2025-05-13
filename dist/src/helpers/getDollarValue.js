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
exports.getDollarValue = void 0;
const fetchUrl = "https://pydolarve.org/api/v2/dollar?page=alcambio&format_date=iso&rounded_price=true";
const getDollarValue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(fetchUrl);
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.log("Error fetching dollar value:", error);
        throw new Error("Failed to fetch dollar value");
    }
});
exports.getDollarValue = getDollarValue;
//# sourceMappingURL=getDollarValue.js.map