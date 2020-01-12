import Joi from 'joi';
import responseHandler from '../helpers/response';

const validate = {
    signUp(req, res, next) {
        const schema = {
            fullName: Joi.string().trim().regex(/^[A-Za-z\\s]+$/i).required().error(() => 'Valid full name is required'),
            email: Joi.string().trim().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i).required().error(() => 'Valid email is required'),
            national_id: Joi.string().trim().min(16).regex(/^[0-9]{16}$/i).required().error(() => 'National Id must be 16 numbers'),
            phoneNumber: Joi.string().trim().regex(/[0-9]{10}$/i).required().error(() => 'PhoneNumber must be 10 numbers'),
            date_of_birth: Joi.string().trim().regex(/^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(19[7-9]\d|200[1-2]\d|200[1-2])$/i).required().error(() => 'Date Of Birth format must be dd/mm/yyyy'),
            password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().error(() => 'Password must be atleast 8 long with atleast 1 number, one capital letter')
        }
        const { error } = Joi.validate(req.body, schema);
        if(error) return responseHandler(res, 400, { "error": error.details[0].message });
        next();
    },

    signIn(req, res, next) {
        const schema = {
            email: Joi.string().trim().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i).required().error(() => 'Valid email is required'),
            password: Joi.string().trim().required().error(() => 'Password required')
        }
        const { error } = Joi.validate(req.body, schema);
        if (error) return responseHandler(res, 400, { "error": error.details[0].message });
        next();
    }
}


export default validate;