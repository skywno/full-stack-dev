const testingRouter = require('express').Router()
const Blog = require('../models/blog')

testingRouter.post('/reset', (request, response) => {
  Blog.deleteMany({})
  response.status(201).end()
})

module.exports = testingRouter