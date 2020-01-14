import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import responseHandler from '../helpers/response';

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) return responseHandler(res, 404, {Error: "Please Provide a token"});
        const authorizedManager = jwt.verify(token, process.env.SECRET_KEY);
        req.authorizedManager = authorizedManager;
        next();
    } catch (error) {
        responseHandler(res, 401, {Unauthorized: 'Token invalid or expired'});
    }
}

export default verifyToken;