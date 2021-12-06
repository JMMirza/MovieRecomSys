const { User } = require('../../model/user')

module.exports = async(req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({ message: "invalid token" })
        if (req.user._id !== req.params.id) return res.status(403).send({ message: "invalid user" })
        res.status(200).json({
            message: "Details of User with corresponding id is below: ",
            id: `${user._id}`,
            name: `${user.name}`,
            email: `${user.email}`
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}