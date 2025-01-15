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
exports.getUsers = exports.pagination = exports.deleteUsers = exports.updateUsers = exports.getUserById = exports.createUsers = void 0;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = [];
        res.json({ res: "API it's working", users: users });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUsers = getUsers;
// Get user By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Get by ID", id: crypto.randomUUID() });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getUserById = getUserById;
// Update user by Id
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Updating user" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.updateUsers = updateUsers;
// Delete user by Id
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Deleting user" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteUsers = deleteUsers;
// Create user
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Creating user" });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createUsers = createUsers;
// Get a quantity of users by a number (Pagination)
const pagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ res: "Pagination", qty: 20 });
    }
    catch (err) {
        console.log(err);
    }
});
exports.pagination = pagination;
//# sourceMappingURL=user.controller.js.map