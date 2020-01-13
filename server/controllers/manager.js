import bcryptjs from 'bcryptjs';
import managerDb from '../models/managerDb';
import assignToken from '../helpers/assignToken';
import responseHandler from '../helpers/response';

const manager = {
    createManager(req, res) {
        try {
            const { fullName , email, national_id, phoneNumber, date_of_birth, password } = req.body;
            const user = managerDb.find((element) => element.email === email || element.national_id === national_id || element.phoneNumber === phoneNumber);
            if(user) return responseHandler(res, 409, { Error: "User with same credentials already exists (email, phoneNumber or national Id)"});
            const hashPassword = bcryptjs.hashSync(password, 5);
            const newUser = {fullName: fullName, email: email, national_id: national_id, phoneNumber: phoneNumber, date_of_birth: date_of_birth, status: "active", position: "Manager", password: hashPassword};
            managerDb.push(newUser);
            const userInfo = managerDb[managerDb.length-1];
            assignToken({email: userInfo.email});
            return responseHandler(res, 201, {"success": "Manager Successfully created", newManager: {
                fullName: userInfo.fullName,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                position: userInfo.postion,
                status: userInfo.status
            }});
        } catch(error) {
            responseHandler(res, 500, {Error: error})
            console.log(error);
        }
    },

    loginManager(req, res) {
        try {
            const { email, password } = req.body;
            const user = managerDb.find((element) => element.email === email);
            if(!user) return responseHandler(res, 404, {"Error": "User doesn't exist"});
            const isPasswordValid = bcryptjs.compareSync(password, user.password);
            if(!isPasswordValid) return responseHandler(res, 400, {"Error": "incorrect password"});
            const token = assignToken({email: user.email});
            if(user && isPasswordValid) return responseHandler(res, 200, {"success": "User successfully logged in", "Manager": user.fullName, token});
        } catch (error) {
           return responseHandler(res, 500, {"Error": error})
        }
    }
}


export default manager;