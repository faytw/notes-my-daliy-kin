import axios from 'axios'

const apiHost = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : '/'

const instance = axios.create()
instance.defaults.baseURL = '/api'

export const get = (uri, params = {}) => {
  let query = ''
  if(params) {
    query = Object.entries(params)
    .map((key) =>
    `${encodeURIComponent(key[0])}=${encodeURIComponent(key[1])}` 
    ).join('&')
  }
  const url = query ? `${apiHost}/${uri}?${query}` : `${apiHost}/${uri}`
  return instance.get(url)
}

export const post = (uri, data = {}) => {
  return instance.post(`${apiHost}/${uri}`, data)
}

export const put = (uri, data = {}) => {
  return instance.put(`${apiHost}/${uri}`, data)
}

export const remove = (uri) => {
  return instance.delete(`${apiHost}/${uri}`)
}

export default {
  get,
  post,
  put,
  remove,
}