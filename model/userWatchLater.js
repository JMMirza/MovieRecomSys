const mongoose = require('mongoose')

const userLikeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId
    }
    
})
const UserLikeMovie = mongoose.model('UserLikeMovie', userLikeSchema)

module.exports.UserLikeMovie = UserLikeMovie