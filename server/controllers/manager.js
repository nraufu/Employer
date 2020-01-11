import bcryptjs, { compareSync } from 'bcryptjs';
import managerDb from '../models/dummyDb';
import assignToken from '../helpers/assignToken';

const manager = {
    createManager(req, res) {
        try {
            const { fullName , email, national_id, phonNumber, date_of_birth, password } = req.body;
            const user = managerDb.find((element) => element.email === email);
            if(user) return res.status(409).json({"conflict": "User already exist"});
            const hashPassword = bcryptjs.hashSync(password, 5);
            const newUser = {fullName: fullName, email: email, national_id: national_id, phonNumber: phonNumber, date_of_birth: date_of_birth, status: "active", position: "Manager", password: hashPassword};
            managerDb.push(newUser);
            const userInfo = managerDb[managerDb.length-1];
            const token = assignToken({email: userInfo.email});
            return res.status(201).json({"success": "User Successfully created", newUser: userInfo, token});
        } catch(err) {
          res.status(500).json({"Error" : err});
          console.log(err)
        }
    },

    loginManager(req, res) {
        try {
            const { email, password } = req.body;
            const user = managerDb.find((element) => element.email === email);
            if(!user) return res.status(404).json({"Error": "User doesn't exist"});
            const isPasswordValid = bcryptjs.compareSync(password, user.password);
            if(!isPasswordValid) return res.status(400).json({"Error": "incorrect password"});
            const token = assignToken({email: user.email});
            if(user && isPasswordValid) return res.status(200).json({"success": "User successfully logged in", "User": user.fullName, token});
        } catch (err) {
            res.status(500).json({"Error" : err});
        }
    }
}


export default manager;