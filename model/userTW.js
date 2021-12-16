 const mongoose = require('mongoose')
 const jwt = require('jsonwebtoken')
 const config = require('../config')

 const userTWSchema = new mongoose.Schema({
     user_id: {
         type: String,
     },
     access_token: {
         type: String,
     },
     firstName: {
         type: String,
     },
     username: {
         type: String,
     },
     photo: {
         type: String
     }
 })
 userTWSchema.methods.generateAuthToken = function () {
     const token = jwt.sign({
         _id: this._id
     }, config.secret, {
         expiresIn: "1d"
     })
     return token
 }
 userTWSchema.methods.generateTempAuthToken = function () {
     const token = jwt.sign({
         email: this.email,
         contact: this.contact
     }, config.secret, {
         expiresIn: "300s"
     })
     return token
 }

 const UserTW = mongoose.model('UserTW', userTWSchema)

 module.exports.UserTW = UserTW