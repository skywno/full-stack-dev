import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)

}

const put = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
}

const exportedObject = { getAll, remove, create, put }


export default exportedObject 