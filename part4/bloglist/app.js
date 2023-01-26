const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
app.use(cors())
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const { errorHandler, unknownEndpoint } = require('./utils/error_handler')
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app