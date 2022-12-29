import { useState } from 'react'
import Persons from './components/Persons'
import ContactAdder from './components/PersonAdder'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '050-9543456',
    },
    {
      id: 2,
      name: 'Jarto Kellas',
      number: '045-3451234'
    },
    {
      id: 3,
      name: 'Hilkka Veitola',
      number: '045-34534534'
    },
    {
      id: 4,
      name: 'Jenni Kunnas',
      number: '045-3451234'
    },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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