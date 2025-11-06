// knkhadmo server dialna
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const apiRouter = require('./routes/api')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(morgan('dev')) // logger: morgan
app.use(express.json()) // body parser

app.use('/api', apiRouter)

// global error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
