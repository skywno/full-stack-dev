import './index.css'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'

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

  const blogList = () => {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <Toggable>
          <BlogForm addBlog={addBlog} />
        </Toggable>
        <br></br>
        <br></br>
        {blogs
          .map(blog => <Blog key={blog.id} blog={blog} onUpdate={refreshBlogs} />)}
      </div>
    )
  }
  return (
    <div>
      {user === null
        ? <h2>log in to application</h2>
        : <h2>blogs</h2>}
      <Notification message={message} flag={messageFlag}></Notification>
      {user === null
        ? <LoginForm onSubmit={handleLogin} username={username} onUsernameChange={setUsername}
          password={password} onPasswordChange={setPassword} />
        : blogList()
      }
    </div>
  )
}

export default App

