import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL
console.log(baseUrl)
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = person => {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(response => response.data)
}

const update = person => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => response.data)
}

const allExports = {
    getAll,
    create,
    delete: deletePerson,
    update
}

export default allExports