 const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userFbSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    access_token: {
        type: String,
        lowercase: true
    },
    firstName: {
        type: Number,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
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