import { UserBody } from "../interface/interface";

export const usersSeeds: UserBody[] = [
  {
    _id: 1,
    user_dni: '123456789',
    name: 'Juan',
    last_name: 'Perez',
    weight: 75,
    age: 30,
    registration_date: new Date('2023-01-15'),
    last_payment: new Date('2023-10-01'),
    days_of_debt: 0,
    trainer_dni: 'trainer-001',
    trainer_name: 'Carlos',
    last_update: new Date('2023-10-05'),
    invoices_id: ['invoice-001'],
    /* createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15') */
  },
  {
    _id: 2,
    user_dni: '456789123',
    name: 'Ana',
    last_name: 'Hernandez',
    weight: 75,
    age: 30,
    registration_date: new Date('2023-01-15'),
    last_payment: new Date('2023-10-01'),
    days_of_debt: 0,
    trainer_dni: 'trainer-001',
    trainer_name: 'Carlos',
    last_update: new Date('2023-10-05'),
    invoices_id: ['invoice-001'],
    /* createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15') */
  },
  {
    _id: 3,
    user_dni: '159487263',
    name: 'Carlos',
    last_name: 'Suarez',
    weight: 75,
    age: 30,
    registration_date: new Date('2023-01-15'),
    last_payment: new Date('2023-10-01'),
    days_of_debt: 0,
    trainer_dni: 'trainer-001',
    trainer_name: 'Carlos',
    last_update: new Date,
    invoices_id: ['invoice-001'],
    /* createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15') */
  }
];
