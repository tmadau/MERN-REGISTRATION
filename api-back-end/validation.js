const Joi = require('@hapi/joi'); // Validation

// Validation for registration
const registerValidation = data => {
    const schema = Joi.object ({
        username: Joi.string()
            .min(5)
            .max(40)
            .required(),
        email: Joi.string()
            .min(7)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(7)
            .max(1024)
            .required()
    });
    return schema.validate(data)
};

// Validation for login 
const loginValidation = data => {
    const schema = Joi.object ({
        email: Joi.string()
            .min(7)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(7)
            .max(1024)
            .required()
    });
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;