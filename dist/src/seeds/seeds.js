"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainersSeeds = exports.usersSeeds = void 0;
exports.usersSeeds = [
    {
        _id: 1,
        user_dni: "123456789",
        name: "Juan",
        last_name: "Perez",
        weight: 75,
        age: 30,
        registration_date: new Date("2023-01-15"),
        last_payment: new Date("2023-10-01"),
        days_of_debt: 0,
        trainer_dni: "trainer-001",
        trainer_name: "Carlos",
        last_update: new Date("2023-10-05"),
        invoices_id: ["invoice-001"],
        plan: "daily",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 2,
        user_dni: "456789123",
        name: "Ana",
        last_name: "Hernandez",
        weight: 75,
        age: 30,
        registration_date: new Date("2023-01-15"),
        last_payment: new Date("2023-10-01"),
        days_of_debt: 0,
        trainer_dni: "trainer-001",
        trainer_name: "Carlos",
        last_update: new Date("2023-10-05"),
        invoices_id: ["invoice-001"],
        plan: "monthly",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 3,
        user_dni: "159487263",
        name: "Carlos",
        last_name: "Suarez",
        weight: 75,
        age: 30,
        registration_date: new Date("2023-01-15"),
        last_payment: new Date("2023-10-01"),
        days_of_debt: 0,
        trainer_dni: "trainer-001",
        trainer_name: "Carlos",
        last_update: new Date(),
        invoices_id: ["invoice-001"],
        plan: "weekly",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
];
exports.trainersSeeds = [
    {
        _id: 1,
        trainer_dni: "123456789",
        name: "Trainer Juan",
        last_name: "Perez",
        age: 30,
        area: "trainer-001",
        assigned_clients: ["123456789"],
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 2,
        trainer_dni: "456789123",
        name: "Ana",
        last_name: "Hernandez",
        age: 30,
        assigned_clients: [""],
        area: "",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 3,
        trainer_dni: "159487263",
        name: "Carlos",
        last_name: "Suarez",
        age: 30,
        assigned_clients: ["invoice-001"],
        area: "",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
];
//# sourceMappingURL=seeds.js.map