const Joi = require('joi')
module.exports = function(req, res, next) {
    const schema = {
        name: Joi.string().min(5).max(255).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.min":
                        return { message: "Minimum length of name" };
                    case "string.max":
                        return { message: "Maximum length of name" };
                    case "any.empty":
                        return { message: "Name is not allowed to be empty" };
                }
            })
        }),
        contact: Joi.string().regex(/^((\+92)|(0092))\d{3}-{0,1}\d{7}$|^\d{12}$/).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct phone number" };
                    case "any.empty":
                        return { message: "Contact is not allowed to be empty" };
                }
            })
        }),
        dob: Joi.string().regex(/(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct date of birth (YYYY/MM/DD)" };
                    case "any.empty":
                        return { message: "Date of birth is not allowed to be empty" };
                }
            })
        }),
        password: Joi.string().min(5).max(255).regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct password (it must contain: at least 1 uppercase character, 1 numeric character,  one special character and contain eight characters or longer)" };
                    case "any.empty":
                        return { message: "Password is not allowed to be empty" };
                }
            })
        }),
        cpassword: Joi.string().min(5).max(255).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.empty":
                        return { message: "Confirm Password is not allowed to be empty" };
                }
            })
        }),

    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            error: error.details[0].message
        })
    }
    next()
}