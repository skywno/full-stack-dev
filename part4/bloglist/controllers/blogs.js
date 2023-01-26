const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

// /api/blogs

blogsRouter.get('/', async (request, response) => {
  const returnedBlogs = await Blog.find({})
  response.json(returnedBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

module.exports = blogsRouter
