import { useEffect, useState } from 'react'
import personService from './services/personService'
import { Filter, Person, Notification } from './components/components'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const runTimeout = () => {
    setTimeout(() => {
      setNewMessage('')
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const person = persons.find(person => person.name = newName)
      const updatedPerson = { ...person, number: newNumber }
      personService.put(updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response))
          setNewMessage(`Updated ${newName}'s phone number to ${newNumber}`)
        })
        .catch(error => {
          setNewMessage(`Information of ${newName} has already been removed from servers`)
        })
    }
    else {
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage(`Added ${returnedPerson.name} `)
      })
    }
    runTimeout()
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (name, id) => {
    window.confirm(`Delete ${name} `)
    personService.remove(id).then(_ => {
      setPersons(persons.filter(person => person.id !== id))
      setNewMessage(`Deleted ${name} `)
      runTimeout()
    }).catch(error => {
      setNewMessage(`Information of ${newName} has already been removed from servers`)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h3>Numbers</h3>
      <div>
        {personsFiltered
          .map(person =>
            <Person key={person.id}
              name={person.name}
              number={person.number}
              onDelete={() => deletePerson(person.name, person.id)} />
          )
        }
      </div>
    </div>
  )
}

export default App;
