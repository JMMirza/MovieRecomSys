const express = require('express')
const app = express()
const config = require('./config')
const passport = require('passport')
var session = require('express-session');
require('./utils/dbconnection')()

app.use(passport.initialize());
// app.use(passport.session()); 
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api', require('./routes/routes.js'));
passport.serializeUser(function(user,cb){
    cb(null,user)
})
const port = process.env.PORT  || 3000
module.exports = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
