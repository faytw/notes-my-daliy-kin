import { USER as api } from '../../../api'

export default {
  GET_USER_INFOS: ({ commit, dispatch }, payload) => {
    api.getUserInfos(payload).then(( data ) => {
      commit('setUserInfos', data)
    })
    .catch((err) => console.log(err))
  },
  GET_USER_INFOS_WITH_ID: ({commit}, payload) => {
    api.getUserInfosWithId(payload).then(( data ) => {
      commit('setUserInfos', data)
    })
    .catch((err) => console.log(err))
  },
  SET_VISITOR_INFOS: ({commit}, payload) => {
    commit('setUserInfos', payload)
  }
}
