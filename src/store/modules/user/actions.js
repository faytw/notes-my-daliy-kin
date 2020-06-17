import { USER as api } from '../../../api'

export default {
  GET_USER_INFOS: ({ commit, dispatch }, payload) => {
    // sessionStorage set userID
    // if storage id exsit, call getUserInfosWithId
    api.getUserInfos(payload).then(( data ) => {
      commit('setUserInfos', data)
    })
    .catch((err) => console.log(err))
  },
  GET_USER_INFOS_WITH_ID: ({}, payload) => {
    api.getUserInfosWithId(payload).then(( data ) => {
      commit('setUserInfos', data)
    })
    .catch((err) => console.log(err))
  }
}
