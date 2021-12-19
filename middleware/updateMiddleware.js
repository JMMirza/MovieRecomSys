const Joi = require('joi')
module.exports = function (req, res, next) {
    const schema = {
        name: Joi.string().min(5).max(255),
        contact: Joi.string().regex(/^((\+92)|(0092))\d{3}-{0,1}\d{7}$|^\d{12}$/),
        dob: Joi.string().regex(/(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/),
        password: Joi.string().min(5).max(255).regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    }
    const {
        error
    } = Joi.validate(req.body, schema)
    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            error: error.details[0].message
        })
    }
    next()
}