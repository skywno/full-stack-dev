import { useState } from 'react'

const Blog = ({ blog, handleDelete, handleLikesClick }) => {

  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block'
  }

  const emptyStyle = {
    display: 'none'
  }

  const toggleDetails = () => {
    setDetails(!details)
  }

  return (
    <>
      <div style={details ? emptyStyle : blogStyle} className='blogInShort'>
        <div>
          {blog.title}
        </div>
        <div>
          {blog.url}
        </div>
        <button onClick={toggleDetails} id='view-button'>view</button>
      </div>
      <div style={details ? blogStyle : emptyStyle} className='blogInDetail'>
        <div>{blog.title} </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={async () => await handleLikesClick(blog)}>like</button></div>
        <div>{blog.author}</div>
        <button onClick={toggleDetails}>hide</button>
        <button id='delete-button' onClick={async () => await handleDelete(blog)}>remove</button>
      </div>
    </>
  )
}

export default Blog