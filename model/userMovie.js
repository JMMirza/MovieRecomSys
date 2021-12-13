const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userFbSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
    }
})
userFbSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.secret, { expiresIn: "1d" })
    return token
}
userFbSchema.methods.generateTempAuthToken = function() {
    const token = jwt.sign({ email: this.email, contact: this.contact }, config.secret, { expiresIn: "300s" })
    return token
}

const UserFB = mongoose.model('UserFB', userFbSchema)

module.exports.UserFB = UserFB