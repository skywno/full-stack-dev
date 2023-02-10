import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate }) => {

  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const emptyStyle = {
    display: 'none'
  }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const increaseLikesByOne = async () => {
    const blogs = await blogService.getAll()
    const matchedBlog = blogs.filter(b => b.id === blog.id)[0]
    const updatedBlog = {
      ...matchedBlog,
      likes: matchedBlog.likes + 1
    }
    await blogService.update(blog.id, updatedBlog)
    await onUpdate()
  }

  const handleDelete = async () => {
    const answer = window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)
    if (answer === true) {
      await blogService.deleteBlog(blog.id)
      await onUpdate()
    }
  }
  return (
    <>
      <div style={details ? emptyStyle : blogStyle}>
        {blog.title} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={details ? blogStyle : emptyStyle}>
        <div>{blog.title} <button onClick={toggleDetails}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={increaseLikesByOne}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={handleDelete}>remove</button>
      </div>
    </>
  )
}

export default Blog