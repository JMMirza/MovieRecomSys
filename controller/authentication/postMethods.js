const {
    User
} = require('../../model/user')
const speakeasy = require("speakeasy");

async function twoFA(req, res) {
    try {
        console.log(req.user)
        let tokenUser = await User.findById(req.user._id)
        const anotherUser = await User.findOne({
            email: req.user.email
        })
        if (!tokenUser) {
            if (!anotherUser)
                return res.status(400).json({
                    message: "Invalid token"
                })
        }
        if (tokenUser === null) {
            tokenUser = anotherUser
        }

        // Retrieve user from database
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) return res.status(400).json({
            message: "User not found"
        })
        if (tokenUser.email !== user.email) return res.status(403).json({
            message: "Warning!!! User is invalid"
        })

        const tokenVerified = speakeasy.totp.verify({
            secret: user.secretKey,
            encoding: 'base32',
            token: req.body.token
        });
        if (tokenVerified) {
            // Update user data
            user.session = true
            user.twoFA = true
            await user.save()
            return res.status(200).send({
                message: "Congratulations authentication completes",
                Id: user._id,
                Name: user.name,
                Two_factor_Auth: user.twoFA
            });
        } else {
            return res.status(400).send({
                message: "Authentication failed please try again"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    };
}
module.exports = {
    twoFA
}