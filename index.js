const express = require('express')
const app = express()
const config = require('./config')
require('./utils/dbconnection')()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api', require('./routes/routes.js'));

const port = process.env.PORT  || 3000
module.exports = app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
