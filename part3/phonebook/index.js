const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('data', function (req, res) {
    if (req.method !== 'POST') {
        return ""
    }
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const count = persons.length
    const time = new Date()
    console.log(time)
    response.end(`<div> Phonebook has info for ${count} people</div><div>${time}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(pb => pb.id === id)

    if (!person) {
        return response.status(404).end()
    }

    return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(400).end()
    }

    persons = persons.filter(p => p.id !== id)
    return response.status(204).end()

})


const generateId = () => {
    return Math.floor(Math.random() * 1000000000)
}


app.post('/api/persons', (request, response) => {
    const body = request.body

    try {
        validateNameAndNumber(body.name, body.number)
    }
    catch (e) {
        return response.status(400).json({
            error: e.message
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number,
    }

    persons = persons.concat(person)
    return response.json(person)
})



const validateNameAndNumber = (name, number) => {
    if (!name || !number) {
        throw new Error('name or number missing')
    }

    if (persons.map(p => p.name).find(n => n === name)) {
        throw new Error('name must be unique')
    }

    return true
}


const PORT = process.env.PORT || 3001
app.listen(PORT)
