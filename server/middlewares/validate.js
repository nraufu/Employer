import Joi from 'joi';

const validate = {
    signup(req, res, next) {
        const schema = {
            fullName: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            national_id: Joi.string().min(16).max(16).required(),
            phoneNumber: Joi.string().min(10).max(10).required(),
            date_of_birth: Joi.string().required(),
            password: Joi.string().required()
        }
        const error = validateFunction(req.body, schema);
        if(error) return res.status(400).send(error.details[0].message);
        next();
    },

    signIn(req, res, next) {

    }
}

const validateFunction = (param1, param2) => {
    const { error } = Joi.validate(param1, param2);
    return error;
}

export default validate;