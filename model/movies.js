const mongoose = require('mongoose')

const movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: String
    },
    genres: {
        type: String
    },
    rating: {
        type: String
    },
    tag: {
        type: String
    }
}))

module.exports.movie = movie
