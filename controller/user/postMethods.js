const {
    User
} = require('../../model/user')
const {
    UserLikeMovie
} = require('../../model/userLikesMovies')
const {
    movie
} = require('../../model/movies')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const config = require('../../config')
const {
    PythonShell
} = require('python-shell')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.nodemailerEmail,
        pass: config.nodemailerPass,
    },
});
async function signUp(req, res) {
    try {
        if (req.body.password !== req.body.cpassword) return res.status(400).send({
            message: 'Password doesnot match'
        });
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            dob: req.body.dob,
            password: req.body.password,

        })

        const token = user.generateAuthToken()
        const url = `${config.url}/api/user/verify/${token}`;

        await transporter.sendMail({
            from: "edummy304@gmail.com",
            to: user.email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })
        // const result = await user.save()
        return res.status(201).json({
            message: `Sent a verification email to ${user.email}.`,
            id: `${user._id}`,
            name: `${user.name}`,
            email: `${user.email}`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }

}

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
async function likeMovies(req, res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({
            message: "invalid user"
        })
        const movieByID = await movie.findById(req.body.id)
        if (!movieByID) {
            return res.status(400).send("no movie found")
        }
        const likedMovie = await UserLikeMovie.findOne({
            user_id: user._id,
            movie_id: movieByID._id
        })
        if (likedMovie) {
            return res.send("already liked the movie")
        }
        await UserLikeMovie.create({
            user_id: user._id,
            movie_id: movieByID._id
        })
        res.status(200).send("Successfully added the movie")
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: error.message
        })
    }
}
async function machineLearning(req, res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({
            message: "invalid user"
        })
        let options = {
            // mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
            // scriptPath: 'evesdrop.py', //If you are having python_test.py script in same folder, then it's optional.
            args: [req.body.movie] //An argument which can be accessed in the script using sys.argv[1]
        };


        PythonShell.run('movie_recommendation.py', options, function (err, result) {
            if (err) throw err;
            // result is an array consisting of messages collected
            //during execution of script.
            console.log('result: ', result.toString());
            res.status(200).send({
                search: result
            })
        });
    } catch (error) {
        res.status(500).send(error.message)
    }

}
async function listLikemovies(req,res) {
    try {
        const user = await User.findById(req.user._id)
        if (!user) return res.status(403).send({
            message: "invalid user"
        })
        const likedMovie = await UserLikeMovie.find({
            user_id: user._id,
            movie_id: req.body.movieid
        })
        res.status(200).send(likedMovie)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: error.message
        })
    }
}
module.exports = {
    signUp,
    simpleSignIn,
    likeMovies,
    listLikemovies,
    machineLearning
}