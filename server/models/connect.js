import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

export const pool = new Pool({connectionString: process.env.DATABASE_URL});

export const query = (text, params) => pool.query(text, params);

pool.on('connect', () => console.log('database Connected...'));

