const {
    User
} = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
async function checkEmail(req, res, next) {
    try {
        const alreadyUser = await User.findOne({
            email: req.body.email
        })
        if (alreadyUser) return res.status(400).json({
            message: "Email Already exists"
        })
        next()
    } catch (ex) {
        res.status(500).send({
            message: ex
        })
    }
}


function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('access denied')
    try {
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next();
    } catch (ex) {
        res.status(400).send({
            message: "invalid user",
            error: ex.message
        })
    }
}

function age(req, res, next) {
    if (!req.body.dob) return next();
    const today = new Date();
    const birthDate = new Date(req.body.dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    try {
        if (age >= 13) {
            console.log(age)
            req.age = age
            next()
        } else {
            return res.status(400).json({
                message: "Your age must be greater that 13 years"
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}
module.exports = {
    age,
    auth,
    checkEmail
}