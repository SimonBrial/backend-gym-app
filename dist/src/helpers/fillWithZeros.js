"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillWithZeros = void 0;
const fillWithZeros = (value, length) => {
    const strValue = value.toString();
    const zerosToAdd = length - strValue.length;
    const filledValue = "N" + "0".repeat(zerosToAdd) + strValue;
    return filledValue;
};
exports.fillWithZeros = fillWithZeros;
//# sourceMappingURL=fillWithZeros.js.map