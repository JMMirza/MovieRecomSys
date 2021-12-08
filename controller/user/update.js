const { User } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send("invalid user")
        if (req.user._id !== req.params.id) return res.status(400).send({
            message: "please enter correct info."
        });

        if (req.body.email) {
            return res.send({
                message: "You are not allowed to update your email"
            })
        }

        if (req.body.password) {
            if (!req.body.cpassword) return res.status(400).send({
                message: "enter confirm password"
            });
            if (req.body.password !== req.body.cpassword) return res.status(400).send({ message: 'Password doesnot match' });
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        if (req.body.name || req.body.contact || req.body.dob || req.body.password) {
            user.name = req.body.name === undefined ? user.name : req.body.name
            user.contact = req.body.contact === undefined ? user.contact : req.body.contact
            user.dob = req.body.dob === undefined ? user.dob : req.body.dob
            user.password = req.body.password === undefined ? user.password : req.body.password
            await user.save()
            return res.status(200).json({
                message: "user updated",
                userID: user._id,
                userName: user.name,
                userContact: user.contact,
                userDOB: user.dob
            })
        } else {
            return res.status(400).send({
                message: "Fields are empty"
            })
        }

    } catch (ex) {
        res.status(400).send({ message: ex.message })
    }
}