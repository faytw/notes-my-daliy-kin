import axios from 'axios'

const instance = axios.create()

export const get = (uri, params = {}) => {
  let query = ''
  if(params) {
    query = Object.entries(params)
    .map((key) =>
    `${encodeURIComponent(key[0])}=${encodeURIComponent(key[1])}` 
    ).join('&')
  }
  const url = params ? `${uri}?${query}` : uri
  return instance.get(url)
}

export const post = (url, data = {}) => {
  return instance.post(url, data)
}

export const put = (url, data = {}) => {
  return instance.put(url, data)
}

export const remove = (url) => {
  return instance.delete(url)
}

export default {
  get,
  post,
  put,
  remove,
}