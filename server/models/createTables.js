import {pool} from './connect';

const queryText = `
DROP TABLE IF EXISTS manager, employees;
CREATE TABLE IF NOT EXISTS manager (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    national_id VARCHAR(30) NOT NULL,
    phoneNumber VARCHAR(30) NOT NULL,
    date_of_birth VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    position VARCHAR(30) DEFAULT 'manager',
    created_on TIMESTAMP DEFAULT now() NOT NULL
    );
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    managerId INTEGER REFERENCES manager (id),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    national_id VARCHAR(30) UNIQUE NOT NULL,
    phoneNumber VARCHAR(30) UNIQUE NOT NULL,
    date_of_birth VARCHAR(20) NOT NULL,
    position VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' NULL,
    created_on TIMESTAMP DEFAULT now() NOT NULL
);`

pool.query(queryText, (err, res) => {
    console.log(err)
    pool.end()
});