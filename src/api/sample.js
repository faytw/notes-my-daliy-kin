import http from "../http"

export const sampleOne = (params) => {
  return http.get('http://localhost:3000/tutorials', params)
}

export const sampleTwo = (params) => {
  return http.get(`http://localhost:3000/books`, params)
}

export default {
  sampleOne,
  sampleTwo,
}
