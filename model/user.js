 const mongoose = require('mongoose')
 const jwt = require('jsonwebtoken')
 const config = require('../config')

 const userSchema = new mongoose.Schema({
     name: {
         type: String,
     },
     email: {
         type: String,
         lowercase: true
     },
     contact: {
         type: Number,
     },
     dob: {
         type: String,
     },
     gender: {
         type: String,
     },
     password: {
         type: String,
     },
     isVerified: {
         type: Boolean,
         default: false
     },
     session: {
         type: Boolean,
         default: false
     },

     secretKey: {
         type: String,
         default: null
     },
     twoFA: {
         type: Boolean,
         default: false
     }
 })
 userSchema.methods.generateAuthToken = function () {
     const token = jwt.sign({
         _id: this._id
     }, config.secret, {
         expiresIn: "1d"
     })
     return token
 }
 userSchema.methods.generateTempAuthToken = function () {
     const token = jwt.sign({
         email: this.email,
         contact: this.contact
     }, config.secret, {
         expiresIn: "300s"
     })
     return token
 }

 const User = mongoose.model('User', userSchema)

 module.exports.User = User