const mongoose = require('mongoose')

const userWatchedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId
    }
    
})
const UserWatchedMovie = mongoose.model('UserWatchedMovie', userWatchedSchema)

module.exports.UserWatchMovie = UserWatchedMovie