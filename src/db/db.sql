CREATE TABLE trainer (
  trainer_id SERIAL PRIMARY KEY,
  dni INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  area VARCHAR(100) NOT NULL,
  clients_dni INTEGER
);

CREATE TABLE client (
  client_id SERIAL PRIMARY KEY,
  dni INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  weight DECIMAL NOT NULL,
  registration_date DATE NOT NULL,
  last_pay_date DATE NOT NULL,
  days_of_debt INTEGER NOT NULL,
  trainer_id INTEGER,
  trainer_name VARCHAR(100),
  last_update DATE NOT NULL,
  invoices_id INTEGER
);

CREATE TABLE invoice (
  invoice_id SERIAL PRIMARY KEY,
  dni BIGINT NOT NULL,
  client_name VARCHAR(100) NOT NULL,
  client_last_name VARCHAR(100) NOT NULL,
  trainer_id INTEGER,
  trainer_name VARCHAR(100),
  first_date DATE NOT NULL,
  last_date DATE NOT NULL,
  amount BIGINT NOT NULL,
  client_dni INTEGER NOT NULL
);

ALTER TABLE trainer 
ADD CONSTRAINT trainer_clients_dni_fk FOREIGN KEY (clients_dni) REFERENCES client (client_id);

ALTER TABLE client 
ADD CONSTRAINT user_invoices_id_fk FOREIGN KEY (invoices_id) REFERENCES invoices (invoice_id);

ALTER TABLE invoices 
ADD CONSTRAINT invoices_trainer_id_fk FOREIGN KEY (trainer_id) REFERENCES trainer (trainer_id);

ALTER TABLE client 
ADD CONSTRAINT client_trainer_id_fk FOREIGN KEY (trainer_id) REFERENCES trainer (trainer_id);
