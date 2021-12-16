const mongoose = require('mongoose')

const userBookmarkSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId
    }
    
})
const UserBookmarkMovie = mongoose.model('UserBookmarkMovie', userBookmarkSchema)

module.exports.UserBookmarkMovie = UserBookmarkMovie