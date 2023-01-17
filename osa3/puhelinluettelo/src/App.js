import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonAdder from './components/PersonAdder'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    personsService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }

  useEffect(hook, [])

  const pushNotification = (message,className) => {
    setNotification(
      {
        message: message,
        className: className
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => newName === person.name) !== undefined) {
      updatePerson(newName)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personsService.create(newPerson).then((person) => {
      setPersons(persons.concat([person]))
      setNewName('')
      setNewNumber('')
      pushNotification(`${person.name} was added to phonebook!`, 'success')
    }).catch(error => {
      console.log('', error.response.data)
      pushNotification(error.response.data.error)
    })
  }
  
  const updatePerson = (name) => {
    if (!window.confirm(`${name} is already added to phonebook,
      do you want to replace the old number with a new one?`)
    ) return
    personsService.update({...persons.find(person => person.name === name), number: newNumber})
      .then((data) => {
        setPersons(persons.map(person => person.name === name ? data : person))
        setNewName('')
        setNewNumber('')
        pushNotification(`Updated the number for ${name}`, 'success')
      }).catch((data) => {
        pushNotification(`${name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.name !== name))
      })
  }

  const deletePerson = (id) => {
    const person = {...persons.find(person => person.id === id)}
    if (!window.confirm(`Do you want to delete ${person.name}?`)) return
    personsService.delete(person).then((data) => {
      pushNotification(`${person.name} was deleted.`, 'success')
      setPersons(persons.filter(person => person.id !== id))
    }).catch((data) => {
      pushNotification(`${person.name} has already been removed from server`, 'error')
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const nameChanged = (event) => {
    setNewName(event.target.value)
  }
  const numberChanged = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChanged = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <Filter filterChanged={filterChanged}/>
      <PersonAdder
        handleSubmit={addPerson}
        nameChanged={nameChanged}
        numberChanged={numberChanged}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={persons} filter={filterText} deletePerson={deletePerson}/>
    </div>
  )

}

export default App