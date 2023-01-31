
const { newBlog, newBlogMissingLikes, newBlogMissingTitle, newBlogMissingUrl, initialBlogs } = require('../utils/test_helper')
const { testUser } = require('../utils/test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const api = supertest(app)


const getValidTokenFromTestUser = async () => {
  const response = await api.post('/api/login')
    .send(testUser[0])
    .expect(200)
  return response.body.token;
}

const createTestUser = async () => {
  await api.post('/api/users')
    .send(testUser[0])
    .expect(200)
}

const createTestBlogs = async () => {
  const token = await getValidTokenFromTestUser()
  for (let blog of initialBlogs) {
    await api.post('/api/blogs')
      .send(blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  }
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await createTestUser()
  await createTestBlogs()
})

describe('[GET] /api/blogs ', () => {

  test('step 1: Given a valid request, then returns 200 ', async () => {
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

  test('step3: Given a valid token and request, then successfully create a new blog post', async () => {
    const token = await getValidTokenFromTestUser()
    let response = await api.post('/api/blogs')
      .send(newBlog[0])
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    expect(savedBlog.title).toEqual(newBlog[0].title)
    expect(savedBlog.author).toEqual(newBlog[0].author)

    response = await api.get('/api/blogs').expect(200)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('step4: Given a valid token but missing the likes property, then it will be set to 0', async () => {
    const token = await getValidTokenFromTestUser()
    let response = await api.post('/api/blogs')
      .send(newBlogMissingLikes)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('step5: Given a valid token but missing title or url properties, returns bad request', async () => {
    const token = await getValidTokenFromTestUser()
    await api.post('/api/blogs')
      .send(newBlogMissingTitle)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(400)

    await api.post('/api/blogs')
      .send(newBlogMissingUrl)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(400)
  })

  test('4.23*: Given an invalid token, then returns an unauthorized error', async () => {
    const invalidToken = "SOME INVALID TOKEN"
    await api.post('/api/blogs')
      .send(newBlog[0])
      .set({ 'Authorization': `Bearer ${invalidToken}` })
      .expect(401)
  })
})

describe(`[DELETE] /api/blogs/{id}`, () => {
  test('Given a valid token and id, then blog successfully deleted', async () => {
    const token = await getValidTokenFromTestUser()
    const response = await api.get('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(200)

    const ids = response.body.map(blog => blog.id)

    await api.delete(`/api/blogs/${ids[0]}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(204)
  })

  test('Given an invalid id despite a valid token, then fails to delete the blog', async () => {
    const token = await getValidTokenFromTestUser()
    await api.delete('/api/blogs/32456786543245')
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(404)

  })
})

describe('[PUT] /api/blogs/{id}', () => {
  test('step 2: given valid token, id and JSON object, then updates the blog successfully', async () => {
    const getResponse = await api.get('/api/blogs')
      .expect(200)

    const testBlogIds = getResponse.body
      .filter(blog => blog.user.username === testUser[0].username)
      .map(blog => blog.id)

    const token = await getValidTokenFromTestUser()
    const putResponse = await api.put(`/api/blogs/${testBlogIds[0]}`)
      .send({ likes: 1434 })
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(putResponse.body.likes).toEqual(1434)
  })

  test('step 2: given valid token and id, but empty json, then validation fails', async () => {
    const token = await getValidTokenFromTestUser()
    const getResponse = await api.get('/api/blogs')
      .expect(200)

    const blogs = getResponse.body
    await api.put(`/api/blogs/${blogs[0].id}`)
      .send({})
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(400)
  })

  test('step 2: given an invalid token, but valid id and JSON object, then fails with unauthorized access', async () => {
    const getResponse = await api.get('/api/blogs')
      .expect(200)

    const testBlogIds = getResponse.body
      .filter(blog => blog.user.username === testUser[0].username)
      .map(blog => blog.id)

    const token = "Invalid token"
    const putResponse = await api.put(`/api/blogs/${testBlogIds[0]}`)
      .send({ likes: 1434 })
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(401)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})