"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testInvoices = exports.trainersSeeds = exports.usersSeeds = void 0;
exports.usersSeeds = [
    {
        _id: 1,
        userDni: "123456789",
        name: "Juan",
        lastName: "Perez",
        weight: 75,
        age: 30,
        registrationDate: new Date("2023-01-15"),
        lastPayment: new Date("2023-10-01"),
        daysOfDebt: 0,
        trainerDni: "trainer-001",
        trainerName: "Carlos",
        lastUpdate: new Date("2023-10-05"),
        invoicesArray: ["invoice-001"],
        plan: "daily",
        phoneNumber: "04145869974",
        email: "correo01@correo.com",
        direction: "house's direction",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 2,
        userDni: "456789123",
        name: "Ana",
        lastName: "Hernandez",
        weight: 75,
        age: 30,
        registrationDate: new Date("2023-01-15"),
        lastPayment: new Date("2023-10-01"),
        daysOfDebt: 0,
        trainerDni: "trainer-001",
        trainerName: "Carlos",
        lastUpdate: new Date("2023-10-05"),
        invoicesArray: ["invoice-001"],
        plan: "monthly",
        phoneNumber: "04145869974",
        email: "correo02@correo.com",
        direction: "house's direction",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 3,
        userDni: "159487263",
        name: "Carlos",
        lastName: "Suarez",
        weight: 75,
        age: 30,
        registrationDate: new Date("2023-01-15"),
        lastPayment: new Date("2023-10-01"),
        daysOfDebt: 0,
        trainerDni: "trainer-001",
        trainerName: "Carlos",
        lastUpdate: new Date(),
        invoicesArray: ["invoice-001"],
        plan: "weekly",
        phoneNumber: "04145869974",
        email: "correo03@correo.com",
        direction: "house's direction",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
];
exports.trainersSeeds = [
    {
        _id: 1,
        trainerDni: "123456789",
        name: "Trainer Juan",
        lastName: "Perez",
        age: 30,
        area: "trainer-001",
        assignedClients: ["123456789"],
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 2,
        trainerDni: "456789123",
        name: "Ana",
        lastName: "Hernandez",
        age: 30,
        assignedClients: [""],
        area: "",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
    {
        _id: 3,
        trainerDni: "159487263",
        name: "Carlos",
        lastName: "Suarez",
        age: 30,
        assignedClients: ["invoice-001"],
        area: "",
        /* createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-15') */
    },
];
exports.testInvoices = [
    {
        _id: 1,
        invoiceId: "N00001",
        userDni: "V12345678",
        userName: "Carlos",
        userLastName: "García",
        trainerDni: "No asignado",
        trainerName: "No asignado",
        // trainerLastName: "No asignado",
        firstDate: new Date("2025-04-01"),
        lastDate: new Date("2025-04-30"),
        amount: 100,
        plan: "monthly",
        phoneNumber: "04145869974",
        email: "correo01@correo.com",
        direction: "house's direction",
        averageValue: 0,
        minExchangeDollarValue: 0,
        maxExchangeDollarValue: 0,
        paymentMethod: "contado",
        comments: "No hay comentario",
    },
    {
        _id: 2,
        invoiceId: "N00002",
        userDni: "V87654321",
        userName: "María",
        userLastName: "Pérez",
        trainerDni: "E12345678",
        trainerName: "Luis",
        // trainerLastName: "Rodríguez",
        firstDate: new Date("2025-04-01"),
        lastDate: new Date("2025-04-07"),
        amount: 25,
        plan: "weekly",
        phoneNumber: "04145869974",
        email: "correo03@correo.com",
        direction: "house's direction",
        averageValue: 0,
        minExchangeDollarValue: 0,
        maxExchangeDollarValue: 0,
        paymentMethod: "contado",
        comments: "No hay comentario",
    },
    {
        _id: 3,
        invoiceId: "N00003",
        userDni: "V11223344",
        userName: "José",
        userLastName: "Hernández",
        trainerDni: "No asignado",
        trainerName: "No asignado",
        // trainerLastName: "No asignado",
        firstDate: new Date("2025-04-02"),
        lastDate: new Date("2025-04-02"),
        amount: 10,
        plan: "daily",
        phoneNumber: "04145869974",
        email: "correo03@correo.com",
        direction: "house's direction",
        averageValue: 0,
        minExchangeDollarValue: 0,
        maxExchangeDollarValue: 0,
        paymentMethod: "contado",
        comments: "No hay comentario",
    },
];
//# sourceMappingURL=seeds.js.map