const User = require('../models/user')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)

// const initialUsers = [
//   {
//     username: "username 1",
//     name: "test user 1",
//     password: "password"
//   }, {
//     username: "username 2",
//     name: "test user 2",
//     password: "password"
//   }, {
//     username: "username 3",
//     name: "test user 3",
//     password: "password"
//   }
// ]

beforeEach(async () => {
  await User.deleteMany({})
  // await User.insertMany(initialUsers)
})

describe('[POST] /api/users ', () => {

  test('4.16: Given Username or password less than 3 characters long,\
  returns 400', async () => {

    const newUserWithInvalidUsername = {
      name: "new name",
      username: "ne",
      password: "password"
    }

    await api.post('/api/users')
      .send(newUserWithInvalidUsername)
      .expect(400)


    const newUserWithInvalidPassword = {
      name: "new name",
      username: "new username",
      password: "pa"
    }

    await api.post('/api/users')
      .send(newUserWithInvalidPassword)
      .expect(400)
  })


  test('4.16: Given Username or password at least 3 characters long,\
  returns 200', async () => {

    const newUser = {
      name: "new name",
      username: "new username ???",
      password: "password"
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)
  })

  test('4.16: username has to be unique', async () => {
    const newUser = {
      name: "new name",
      username: "new username",
      password: "password"
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})