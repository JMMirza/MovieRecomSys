const {
    User
} = require('../../model/user')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const speakeasy = require("speakeasy");
const secretKey = speakeasy.generateSecret()

async function verifyUser(req, res) {
    const token = req.params.id
    if (!token) {
        return res.status(422).send({
            message: "Missing Token"
        });
    }
    let payload = null
    try {
        payload = jwt.verify(
            token, config.secret
        );
    } catch (err) {
        return res.status(500).send({
            message: "Error occurs while verifying token",
            error: err.message
        });
    }
    try {
        const user = await User.findById(payload._id);
        if (!user) {
            return res.status(404).send({
                message: "User does not  exists"
            });
        }
        if (user.isVerified) return res.status(400).json({
            message: "user already verified"
        })

        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            message: "Account Verified"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error occurs in verifying user",
            error: err.message
        });
    }

}
async function sendToken(req, res) {

    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(400).json({ message: "Invalid token" })
        if (user.twoFA) return res.status(400).json({ message: "Two FA is already enabled" })
            // user.twoFA = true
        user.secretKey = secretKey.base32
        await user.save()
        return res.status(200).json({ message: 'Successfull', userID: user._id, userName: user.name, userContact: `+${user.contact}`, key: user.secretKey })
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message })
    }
}
module.exports = {
    verifyUser,
    sendToken
}