const mongoose = require('mongoose')

const userWatchLaterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    time: {
        type: String
    }

})
const UserWatchLaterMovie = mongoose.model('UserWatchLaterMovie', userWatchLaterSchema)

module.exports.UserWatchLaterMovie = UserWatchLaterMovie
