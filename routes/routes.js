const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  simpleSignIn,
  passportFB,
  passportTW

} = require('../controller/user/signin');
const getUser = require('../controller/user/getUser');
const signup = require('../controller/user/signup');
const update = require('../controller/user/update');
const verify = require('../controller/authentication/verifyUser');
const tFA = require('../controller/authentication/twoFA')
const age = require('../middleware/age');
const auth = require('../middleware/auth');
const sendToken = require('../controller/authentication/sendToken');
const signupMiddleware = require('../middleware/signupMiddleware')
const updateMiddleware = require('../middleware/updateMiddleware')
const signinMiddleware = require('../middleware/signinMiddleware')
const twoFAMiddleware = require('../middleware/twoFAMiddleware')
const checkEmail = require('../middleware/checkEmail');

router.post('/signup', [signupMiddleware, age, checkEmail], signup);
router.post('/signin', signinMiddleware, simpleSignIn);
router.post('/user/tvalidate', [twoFAMiddleware, auth], tFA)
router.put('/update/:id', [updateMiddleware, age, auth], update);
router.get('/get/:id', auth, getUser);
router.get('/user/verify/:id', verify)
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
    res.redirect('/');
  });
module.exports = router;