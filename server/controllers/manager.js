import '@babel/polyfill';
import bcryptjs from 'bcryptjs';
import assignToken from '../helpers/assignToken';
import responseHandler from '../helpers/response';
import {query} from '../models/connect';
import queries from '../models/queries';

const manager = {
    async createManager(req, res) {
        try {
            const { fullName , email, national_id, phoneNumber, date_of_birth, password } = req.body;
            const user = await query(queries.managerAlreadyExist, [email,national_id,phoneNumber]);
            if(user.rows.length) return responseHandler(res, 409, { Error: "User with same credentials already exists (email, phoneNumber or national Id)"});
            const hashPassword = bcryptjs.hashSync(password, 5);
            const newUser = await query(queries.insertManager, [fullName,email,national_id,phoneNumber,date_of_birth,hashPassword]);
            const newUserInfo = newUser.rows[0];
            return responseHandler(res, 201, {"success": "Manager Successfully created", "newManager" :{
                name : newUserInfo.name,
                email: newUserInfo.email,
                phone_number: newUserInfo.phoneNumber,
                date_of_birth: newUserInfo.date_of_birth
            }
            });
        } catch(error) {
            return responseHandler(res, 500, {Error: error})
        }
    },

    async loginManager(req, res) {
        try {
            const { email, password } = req.body;
            const user = await query(queries.getManager, [email]);
            if(!user.rows.length) return responseHandler(res, 404, {"Error": "User doesn't exist"});
            const isPasswordValid = bcryptjs.compareSync(password, user.rows[0].password);
            if(!isPasswordValid) return responseHandler(res, 400, {"Error": "incorrect password"});
            const token = assignToken({email: user.rows[0].email});
            if(user && isPasswordValid) return responseHandler(res, 200, {"success": "User successfully logged in", "Manager name": user.rows[0].fullName, "token": token});
        } catch (error) {
           return responseHandler(res, 500, {"Error": error})
        }
    }
}


export default manager;