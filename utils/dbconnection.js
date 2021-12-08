const mongoose = require('mongoose')
const config = require('../config')

module.exports = function() {
    mongoose.connect(config.mongo_uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("connection established to the database"))
        .catch(err => console.error("connection cannot established", err.message))
}