const Joi = require('joi')
module.exports = function(req, res, next) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.min":
                        return { message: "Minimum length of email" };
                    case "string.max":
                        return { message: "Maximum length of email" };
                    case "string.email":
                        return { message: "Enter Valid Email" };
                    case "any.required":
                        return { message: "Enter Email" };
                    case "any.empty":
                        return { message: "Email is not allowed to be empty" };
                }
            })
        }),
        token: Joi.string().required().error((errors) => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.required":
                        return { message: "Enter Token" };
                    case "any.empty":
                        return { message: "Token is not allowed to be empty" };
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