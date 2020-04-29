import http from "../helpers/http"

export function getNotes() {
  return http.request('get', 'notes', null, null)
  .then(({ data }) => data)  
  .catch((err) => console.log(err))
}

export const createNotes = (params) => {
  http.post('notes', params).then(({
    data
  }) => {
    console.log(data)
  }).catch((err) => console.log(err))
}

export const updateNotes = (params) => {
  http.patch('notes', params).then(({
    data
  }) => {
    console.log(data)
  }).catch((err) => console.log(err))
}

export const removeNotes = (params) => {
  http.remove('notes', params).then(({
    data
  }) => {
    console.log(data)
  }).catch((err) => console.log(err))
}

export default {
  getNotes,
  createNotes,
  removeNotes,
  updateNotes,
}