
const { newBlog, newBlogMissingLikes, newBlogMissingTitle, newBlogMissingUrl, initialBlogs } = require('../utils/test_helper')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('[GET] /api/blogs ', () => {

  test('step 1', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('step2: blog post contains a property "id" ', async () => {
    const response = await api.get('/api/blogs')
    const blogLists = response.body
    blogLists.forEach(blog => expect(blog.id).toBeDefined)
  })

})

describe('[POST] /api/blogs', () => {
  test('step3: successfully create a new blog post', async () => {

    let response = await api.post('/api/blogs')
      .send(newBlog[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    expect(savedBlog.title).toEqual(newBlog[0].title)
    expect(savedBlog.author).toEqual(newBlog[0].author)

    response = await api.get('/api/blogs')
      .expect(200)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('step4: not given the likes property, it will be set to 0', async () => {

    const response = await api.post('/api/blogs')
      .send(newBlogMissingLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('step5: not given the title or url properties, returns bad request', async () => {
    await api.post('/api/blogs')
      .send(newBlogMissingTitle)
      .expect(400)

    await api.post('/api/blogs')
      .send(newBlogMissingUrl)
      .expect(400)
  }, 10000)
})

afterAll(async () => {
  await mongoose.connection.close()
})