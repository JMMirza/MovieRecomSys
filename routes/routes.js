const express = require('express');
const router = express.Router();
const {
  signUp,
  simpleSignIn,
  likeMovies,
  machineLearning
} = require('../controller/user/postMethods');
const {
  getMovies,
  getUser,
  passportFB,
  passportTW,

} = require('../controller/user/getMethods');
const update = require('../controller/user/update');
const {
  verifyUser,
  sendToken
} = require('../controller/authentication/getMethods');
const {
  twoFA
} = require('../controller/authentication/postMethods')
const {
  age,
  auth,
  checkEmail
} = require('../middleware/combinedMiddlewares');
const signupMiddleware = require('../middleware/signupMiddleware')
const updateMiddleware = require('../middleware/updateMiddleware')
const signinMiddleware = require('../middleware/signinMiddleware')
const twoFAMiddleware = require('../middleware/twoFAMiddleware')

router.post('/likemovie', auth, likeMovies);
router.post('/signup', [signupMiddleware, age, checkEmail], signUp);
router.post('/signin', signinMiddleware, simpleSignIn);
router.post('/user/tvalidate', [twoFAMiddleware, auth], twoFA)
router.put('/update/:id', [updateMiddleware, age, auth], update);
router.get('/get/:id', auth, getUser);
router.get('/getmovie/:id', auth, getMovies);
router.get('/getmovie', auth, getMovies);
router.get('/user/verify/:id', verifyUser)
router.get('/user/twoFA', auth, sendToken)
router.get('/login/facebook',
  passportFB.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',
  passportFB.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/failed'
  }),
  function (req, res) {
    console.log(req.user, req.isAuthenticated())
    res.send("logged in")
  }
);
router.get('/', (req, res) => {
  res.send("Hello world")
})
router.get('/failed', (req, res) => {
  res.send("login failed")
})
router.get('/login/twitter', passportTW.authenticate('twitter'));

router.get('/login/twiter/callback',
  passportTW.authenticate('twitter', {
    failureRedirect: '/'
  }),
  (req, res, next) => {
    console.log("callback", req.user)
    // res.redirect('/');
    res.send(req.user)
  });
router.post('/search',auth, machineLearning)
module.exports = router;