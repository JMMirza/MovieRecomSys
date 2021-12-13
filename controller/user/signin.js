const {
    User
} = require('../../model/user')
const {
    UserFB
} = require('../../model/userFB')
const {
    UserTW
} = require('../../model/userTW')
const bcrypt = require('bcrypt')
const config = require('../../config')
const passportFB = require('passport');
const passportTW = require('passport');
const StrategyFB = require('passport-facebook').Strategy;
const StrategyTW = require('passport-twitter').Strategy;

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
            console.log(profile)
            const user = await UserTW.findOne({
                user_id: profile.id
            })
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                const userTW = await UserTW.create({
                    user_id: profile.id,
                    access_token: accessToken,
                    firstName: profile.displayName,
                    username: profile.username,
                    photo: profile.photos[0].value
                })
                return done(null, userTW);
            }
        } catch (error) {
            return done(error);
        }
    }

));

async function simpleSignIn(req, res) {
    const email = req.body.email
    const pass = req.body.password

    try {
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(404).send({
                message: "User does not exists"
            });
        }
        const validPassword = await bcrypt.compare(pass, user.password)
        if (!validPassword) return res.status(400).send({
            message: "invalid password"
        });
        if (!user.isVerified) {
            return res.status(403).send({
                message: "Verify your Account."
            });
        }
        const token = user.generateAuthToken()
        const temptoken = user.generateTempAuthToken()
        if (user.twoFA === false) {
            if (user.session === false) {
                return res.header('x-auth-token', temptoken).status(200).send({
                    message: "user logged in successfully, complete your two step authentication."
                });
            } else {
                return res.header('x-auth-token', token).status(200).json({
                    message: `User logged in. `,
                    id: user._id,
                    name: user.name
                });
            }
        } else {
            return res.header('x-auth-token', token).status(200).json({
                message: `User logged in. `,
                id: user._id,
                name: user.name
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message
        });
    }
}

module.exports = {
    simpleSignIn,
    passportFB,
    passportTW
}