import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const assignToken = (data) => jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d'});

export default assignToken;