import { query } from '../models/connect';

const managerTableQuery = `
DROP TABLE IF EXISTS manager CASCADE;
CREATE TABLE IF NOT EXISTS manager (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    national_id VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
);`;

const employeesTableQuery =`
DROP TABLE IF EXISTS employee CASCADE;
CREATE TABLE IF EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    national_id VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
);`;

const createTables = async() => {
    try {
       query(`${managerTableQuery} ${employeesTableQuery}`);
    } catch (error) {
       console.log(error); 
    }
}

export default createTables;