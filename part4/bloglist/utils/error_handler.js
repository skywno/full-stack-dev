const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).end()
  }
  next(err)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint }