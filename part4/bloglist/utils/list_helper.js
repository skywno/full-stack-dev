const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0
    : blogs.reduce((previousLikes, curBlog) => previousLikes + curBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikesIndex = -1;
  let mostLikes = Number.MIN_VALUE
  blogs.forEach((blog, index) => {
    if (blog.likes >= mostLikes) {
      mostLikesIndex = index
      mostLikes = blog.likes
    }
  })

  if (mostLikesIndex === -1) {
    return null
  }
  const result = blogs[mostLikesIndex]
  delete result._id
  delete result.__v
  delete result.url

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}