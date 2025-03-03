CREATE TABLE invoice (
  _id SERIAL PRIMARY KEY,
  invoice_id VARCHAR NOT NULL,
  client_dni VARCHAR,
  client_name VARCHAR NOT NULL,
  client_last_name VARCHAR NOT NULL,
  trainer_id INTEGER,
  trainer_name VARCHAR DEFAULT 'No asignado',
  first_date DATE NOT NULL,
  last_date DATE NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE trainer (
  _id SERIAL PRIMARY KEY,
  trainer_dni INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  age INTEGER NOT NULL,
  area VARCHAR DEFAULT 'No indicado',
  clients_dni INTEGER NOT NULL
);

CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  user_dni VARCHAR NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  weight INTEGER NOT NULL,
  age INTEGER NOT NULL,
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  last_payment DATE NOT NULL,
  days_of_debt INTEGER NOT NULL DEFAULT 0,
  trainer_id INTEGER,
  trainer_dni VARCHAR UNIQUE,
  trainer_name VARCHAR DEFAULT 'No asignado',
  last_update DATE NOT NULL DEFAULT CURRENT_DATE,
  invoices_id TEXT[]  -- Usando un array de texto para almacenar los IDs de las facturas
);


ALTER TABLE trainer 
ADD CONSTRAINT trainer_clients_dni_fk FOREIGN KEY (clients_dni) REFERENCES client (client_id);

ALTER TABLE client 
ADD CONSTRAINT user_invoices_id_fk FOREIGN KEY (invoices_id) REFERENCES invoices (invoice_id);

ALTER TABLE invoices 
ADD CONSTRAINT invoices_trainer_id_fk FOREIGN KEY (trainer_id) REFERENCES trainer (trainer_id);

ALTER TABLE client 
ADD CONSTRAINT client_trainer_id_fk FOREIGN KEY (trainer_id) REFERENCES trainer (trainer_id);
