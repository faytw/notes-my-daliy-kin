import axios from 'axios'

const apiHost = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000'
  : '/'

const instance = axios.create()

instance.defaults.baseURL = '/api'

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}, error => Promise.reject(error));

export function request(method, uri, data = null, params = null) {
  if (!method) {
    throw new Error('API function call requires method argument.');
  }

  if (!uri) {
    throw new Error('API function call requires uri argument');
  }

  const url = `${apiHost}/${uri}`;
  return instance({
    method,
    url,
    data,
    params,
  });
}

export default {
  request,
}