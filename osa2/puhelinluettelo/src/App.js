import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import ContactAdder from './components/PersonAdder'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    if (persons.find((person) => newName === person.name) !== undefined) {
      return alert(`${newName} is already added to phonebook`)
    }
    const id = Math.random().toString(16)
    setPersons(persons.concat([
      {
        id: id,
        name: newName,
        number: newNumber,
      }
    ]))
    setNewName('')
    setNewNumber('')
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
      <Filter filterChanged={filterChanged}/>
      <ContactAdder
        handleSubmit={addPerson}
        nameChanged={nameChanged}
        numberChanged={numberChanged}
        newName={newName}
      />
      <Persons persons={persons} filter={filterText}/>
    </div>
  )

}

export default App