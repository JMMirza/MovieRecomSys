const { User } = require('../../model/user')
const speakeasy = require("speakeasy");
require('dotenv').config()
const secretKey = speakeasy.generateSecret()

module.exports = async(req, res) => {

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