import './index.css'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageFlag, setMessageFlag] = useState('')

  useEffect(() => {
    blogService.getAll().then(
      blogs => {
        blogs.sort((one, another) => another.likes - one.likes)
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateMessage = (message, flag) => {
    setMessage(message)
    setMessageFlag(flag)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const refreshBlogs = async () => {
    const blogs = await blogService.getAll()
    const newBlogs = blogs.sort((one, another) => another.likes - one.likes)
    setBlogs(newBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      updateMessage('Wrong username or password', 'error')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      await refreshBlogs()
      updateMessage(`a new blog ${blogObject.title} by ${blogObject.author}`, 'success')
    } catch (exception) {
      updateMessage('Invalid input', 'error')
    }
  }

  const increaseLikesByOne = async (blogObject) => {
    const blogs = await blogService.getAll()
    const matchedBlog = blogs.filter(b => b.id === blogObject.id)[0]
    const updatedBlog = {
      ...matchedBlog,
      likes: matchedBlog.likes + 1
    }
    await blogService.update(blogObject.id, updatedBlog)
    await refreshBlogs()
  }

  const handleDelete = async (blogObject) => {
    const answer = window.confirm(`Remove blog "${blogObject.title}" by ${blogObject.author}`)
    if (answer === true) {
      await blogService.deleteBlog(blogObject.id)
      await refreshBlogs()
    }
  }

  const loginPage = () => {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={message} flag={messageFlag} />
        <LoginForm onSubmit={handleLogin} username={username} onUsernameChange={setUsername}
          password={password} onPasswordChange={setPassword} />
      </>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} flag={messageFlag}></Notification>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <Togglable>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLikesClick={increaseLikesByOne} />)}
      </div>
    )
  }

  return (
    <div>
      {user === null
        ? loginPage()
        : blogList()
      }
    </div>
  )
}

export default App

