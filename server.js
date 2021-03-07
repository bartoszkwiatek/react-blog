const PORT = process.env.PORT || 3001

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const path = require('path')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
if (process.env.ENV === 'dev') {
  const cors = require('cors')
  app.use(cors())
  console.log('cors is used')
}

const handleError = (error) => {
  console.error(error)
}

//temporary password until secured
const uri = process.env.MONGODB_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .catch((error) => handleError(error))

const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

const postsRouter = require('./routes')
const checkJwt = require('./checkJwt')
app.use('/api/posts', postsRouter)

// for testing puropses
app.post(
  '/api/timesheets',
  checkJwt,
  jwtAuthz(['read:posts']),
  function (req, res) {
    // res.status(201).send({ message: "This is the POST /timesheets endpoint" });
    var timesheet = req.body
    // Save the timesheet to the database...

    //send the response
    res.status(201).send(timesheet)
  },
)

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server works!' })
})

// app.get('/api/db-backup', authMiddleware, (req, res) => {
//   res.download('./database/posts.db', 'db-backup.db');
// });

app.use('/', express.static(path.resolve(__dirname, './client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/index.html'))
})

console.log(PORT)
app.listen(PORT)
