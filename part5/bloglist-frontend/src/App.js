import './index.css'

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [messageFlag, setMessageFlag] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setMessage('Wrong username or password')
      setMessageFlag('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogService.create({ title, author, url })
    setMessage(`a new blog ${title} by ${author}`)
    setMessageFlag('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)


  }

  const blogList = () => {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <CreateBlogForm onSubmit={handleCreateBlog} title={title} onTitleChange={setTitle} author={author}
          onAuthorChange={setAuthor} url={url} onUrlChange={setUrl} />
        <br></br>
        <br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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