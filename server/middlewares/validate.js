import Joi from 'joi';
import responseHandler from '../helpers/response';

const validate = {
    signUp(req, res, next) {
        const schema = {
            fullName: Joi.string().trim().regex(/^[A-Za-z\\s]+$/i).required().error(() => 'Valid full name is required'),
            email: Joi.string().trim().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i).required().error(() => 'Valid email is required'),
            national_id: Joi.string().trim().min(16).regex(/^[0-9]{16}$/i).required().error(() => 'National Id must be 16 numbers'),
            phoneNumber: Joi.string().trim().regex(/[0-9]{10}$/i).required().error(() => 'PhoneNumber must be 10 numbers'),
            date_of_birth: Joi.string().trim().regex(/^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(19[7-9]\d|2000\d|200[0-2])$/i).required().error(() => 'Date Of Birth format must be dd/mm/yyyy'),
            password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().error(() => 'Password must be atleast 8 long with atleast 1 number, one capital letter')
        }
        const { error } = Joi.validate(req.body, schema);
        if(error) return responseHandler(res, 400, { "error": error.details[0].message });
        next();
    },

    createEmployee(req, res, next) {
            const schema = {
                name: Joi.string().trim().regex(/^[A-Za-z\\s]+$/i).required().error(() => ' Enter valid name'),
                email: Joi.string().trim().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i).required().error(() => 'Enter valid email is required'),
                national_id: Joi.string().trim().min(16).regex(/^[0-9]{16}$/i).required().error(() => 'Enter national Id must be 16 numbers'),
                phoneNumber: Joi.string().trim().regex(/[0-9]{10}$/i).required().error(() => 'Enter phoneNumber must be 10 numbers'),
                date_of_birth: Joi.string().trim().regex(/^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(19[7-9]\d|200[1-2]\d|200[1-2])$/i).required().error(() => 'Enter date Of Birth format must be dd/mm/yyyy && Employee must be 18 older'),
                position: Joi.string().trim().required().error(() => 'Position of the Employee in the organization required')
            }
            const { error } = Joi.validate(req.body, schema);
            if(error) return responseHandler(res, 400, { "error": error.details[0].message });
            next();
        },

        paramValidation(req, res, next) {
            const schema = {
              id: Joi.number().required().error(() => 'employee Id number must be integer')
            };
             const { error } = Joi.validate(req.params, schema);
            if(error) return responseHandler(res, 400, { "error": error.details[0].message });
            next();
    }
}


export default validate;