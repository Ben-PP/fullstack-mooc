
const PersonAdder = ({handleSubmit, nameChanged, newName, numberChanged, newNumber}) => {
    return (
      <div>

        <h2>Add New</h2>
        <form onSubmit={handleSubmit}>
            <div>
              name: <input
              value={newName}
              onChange={nameChanged}
              />
            </div>
            <div>
              number: <input
              value={newNumber}
              onChange={numberChanged}
              />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
      </div>
    )
}

export default PersonAdder