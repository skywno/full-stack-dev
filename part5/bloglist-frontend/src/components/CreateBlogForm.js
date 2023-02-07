
const CreateBlogForm = ({ onSubmit, title, onTitleChange, author, onAuthorChange, url, onUrlChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input type="text" value={title} name="title" onChange={({ target }) => onTitleChange(target.value)}
        />
      </div>
      <div>
        author:
        <input type="text" value={author} name="author" onChange={({ target }) => onAuthorChange(target.value)}
        />
      </div>
      <div>
        url:
        <input type="text" value={url} name="url" onChange={({ target }) => onUrlChange(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}



export default CreateBlogForm