import { useEffect, useState } from 'react'
import personService from './services/personService'
import { Filter, Notification } from './components/components'
import PersonForm from './components/PersonFom'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const notify = (message, type = 'info') => {
    setNotification(message, type)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newPerson.name)
    if (existingPerson) {
      const ok = window.confirm(`${existingPerson.name} is already added to phonebook, update the number?`)
      if (ok) {

        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.put(existingPerson.id, updatedPerson)
          .then(savedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : savedPerson))
            notify(`Updated info of ${savedPerson.name}`)
          })
          .catch(error => {
            notify(
              `the person '${existingPerson.name}' was had already been from the server`, 'alert'
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })

        return
      }
    }

    personService.create(newPerson).then(savedPerson => {
      setPersons(persons.concat(savedPerson))
      notify(`Added ${savedPerson.name}`)
    })
  }

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {

      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        notify(`Deleted ${toDelete.name}`)
      }).catch(error => {
        notify(
          `the person '${toDelete.name}' was had already been from the server`, 'alert'
        )
      })
    }
  }

  const personsFiltered = (newFilter.length === 0) ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newFilter} onChange={(event) => setNewFilter(event.target.value)}></Filter>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        addPerson={addPerson}
      />
      <Persons
        persons={personsFiltered}
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App;
