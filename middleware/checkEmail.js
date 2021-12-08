const { User } = require('../model/user')

module.exports = async function(req, res, next) {
    try {
        const alreadyUser = await User.findOne({ email: req.body.email })
        if (alreadyUser) return res.status(400).json({
            message: "Email Already exists"
        })
        next()
    } catch (ex) {
        res.status(500).send({ message: ex })
    }
}