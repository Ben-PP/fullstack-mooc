
const Filter = ({filterChanged}) => {
    return (
        <div>
            filter shown with <input
                onChange={filterChanged}
            />
        </div>
    )
}

export default Filter