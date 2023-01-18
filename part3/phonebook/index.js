require('dotenv').config()

const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function (req) {
  if (req.method !== 'POST') {
    return ''
  }
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({}).then(returnedPerson =>
    response.json(returnedPerson)
  )
})

app.get('/info', (request, response) => {
  Person.find({}).then(
    returnedPerson => {
      const count = Object.keys(returnedPerson).length
      const time = new Date()
      response.end(`<div> Phone book has info for ${count} people</div><div>${time}</div>`)
    }
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log(person)
        response.json(person)
      } else {
        console.log(person)
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      if (result.deletedCount === 1) {
        console.log('Successfully deleted one document.')
      } else {
        console.log('No documents matched the query. Deleted 0 documents.')
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })
  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log(request.body)

  const person = {
    name: request.body.name,
    number: request.body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query', new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'mal-formatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT)
