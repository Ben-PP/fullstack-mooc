import Person from "./Person"

const Persons = ({persons, filter, deletePerson}) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.filter((person) =>{
                return person.name.toLowerCase().includes(filter.toLowerCase())
            }).map((person) => {
                return <Person key={person.id} person={person} onDelete={deletePerson}/>
            })}
        </>
    )
}

export default Persons