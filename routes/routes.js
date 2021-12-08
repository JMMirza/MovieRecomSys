const express = require('express');
const router = express.Router();
const passport = require('passport');
const {simpleSignIn} = require('../controller/user/signin');
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
router.get('/get/:id', auth, getUser);
router.put('/update/:id', [updateMiddleware, age, auth], update);
router.get('/user/verify/:id', verify)
router.post('/user/tvalidate', [twoFAMiddleware, auth], tFA)
router.get('/user/twoFA', auth, sendToken)
router.get('/login/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
 
// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/home',
    failureRedirect : '/'
  })
);
module.exports = router;