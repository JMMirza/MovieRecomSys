const {
    User
} = require('../../model/user')
const {
    UserTW
} = require('../../model/userTW')
const {
    movie
} = require('../../model/movies')
const config = require('../../config')
const passportFB = require('passport');
const passportTW = require('passport');
const StrategyFB = require('passport-facebook').Strategy;
const StrategyTW = require('passport-twitter').Strategy;
async function getMovies(req, res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({
            message: "invalid user"
        })
        if (req.query.id == undefined) {
            const movies = await movie.find()
            var movieMap = {}
            movies.forEach(function (movie) {
                movieMap[movie._id] = movie;
            });
            // console.log(movieMap)
            res.send(userMap);
        }
        const movieByID = await movie.findById(req.query.id)
        if (movieByID) {
            return res.status(200).send(movieByID)
        }
        return res.status(400).send("no movie found")

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: error.message
        })
    }
}
async function getUser(req, res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({
            message: "invalid token"
        })
        if (req.user._id !== req.params.id) return res.status(403).send({
            message: "invalid user"
        })
        res.status(200).json({
            message: "Details of User with corresponding id is below: ",
            id: `${user._id}`,
            name: `${user.name}`,
            email: `${user.email}`
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

passportFB.use('facebook', new StrategyFB({
        clientID: config.FACEBOOK_CLIENT_ID,
        clientSecret: config.FACEBOOK_CLIENT_SECRET,
        callbackURL: config.CallBackUrlFB
    },

    // facebook will send back the tokens and profile
    async function (access_token, refresh_token, profile, done) {
        // asynchronous
        try {
            const user = await UserFB.findOne({
                user_id: profile.id
            })
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                const userFb = await UserFB.create({
                    user_id: profile.id,
                    access_token: access_token,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value
                })
                return done(null, userFb);
            }
        } catch (error) {
            return done(error);
        }
        // find the user in the database based on their facebook id
    }
))
passportTW.use('twitter', new StrategyTW({
        consumerKey: config.TWITTER_CONSUMER_KEY,
        consumerSecret: config.TWITTER_CONSUMER_SECRET,
        callbackURL: config.CallBackUrlTW
    },
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await UserTW.findOne({
                user_id: profile.id
            })
            // if the user is found, then log them in
            if (user) {
                const token = user.generateAuthToken()
                return done(null, token); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                const userTW = await UserTW.create({
                    user_id: profile.id,
                    access_token: accessToken,
                    firstName: profile.displayName,
                    username: profile.username,
                    photo: profile.photos[0].value
                })
                console.log("creating user")
                const token = userTW.generateAuthToken()
                return done(null, token);
            }
        } catch (error) {
            return done(error);
        }
    }

));

module.exports = {
    getMovies,
    getUser,
    passportFB,
    passportTW,
}