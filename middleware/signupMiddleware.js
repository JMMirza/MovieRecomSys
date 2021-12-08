const Joi = require('joi')
module.exports = function(req, res, next) {
    const schema = {
        name: Joi.string().min(3).max(255).required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.min":
                        return { message: "Minimum length of name" };
                    case "string.max":
                        return { message: "Maximum length of name" };
                    case "any.required":
                        return { message: "Enter Name" };
                    case "any.empty":
                        return { message: "Name is not allowed to be empty" };
                }
            })
        }),
        email: Joi.string().email().required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.email":
                        return { message: "Enter Valid Email" };
                    case "any.required":
                        return { message: "Enter Email" };
                    case "any.empty":
                        return { message: "Email is not allowed to be empty" };
                }
            })
        }),
        contact: Joi.string().regex(/^((\+92)|(0092))\d{3}-{0,1}\d{7}$|^\d{12}$/).required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct phone number" };
                    case "any.required":
                        return { message: "Enter Contact number" };
                    case "any.empty":
                        return { message: "Contact number is not allowed to be empty" };
                }
            })
        }),
        dob: Joi.string().regex(/(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/).required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct date of birth (YYYY/MM/DD)" };
                    case "any.required":
                        return { message: "Enter data of birth" };
                    case "any.empty":
                        return { message: "Date of Birth is not allowed to be empty" };
                }
            })
        }),
        password: Joi.string().min(5).max(255).required().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.regex.base":
                        return { message: "Please enter correct password (it must contain: at least 1 uppercase character, 1 numeric character,  one special character and contain eight characters or longer)" };
                    case "any.required":
                        return { message: "Enter Password" };
                    case "any.empty":
                        return { message: "Password is not allowed to be empty" };
                }
            })
        }),
        cpassword: Joi.string().min(5).max(255).required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return { message: "Enter confirm Password" };
                    case "any.empty":
                        return { message: "confirm password is not allowed to be empty" };
                }
            })
        }),
        gender:Joi.string().required().valid('male','female').error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return { message: "Enter gender" };
                    case "any.empty":
                        return { message: "Gender is not allowed to be empty" };
                }
            })
        })

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