import { USER as api } from '../../../api'

export default {
  GET_USER_INFOS: ({ commit, dispatch }, payload) => {
    // dispatch('OPEN_LOGS_LOADING', 'visible')
    api.getUserInfos(payload).then(( data ) => {
      // dispatch('CLOSE_LOGS_LOADING', 'hidden')
      commit('setUserInfos', data)
    })
    .catch((err) => console.log(err))
  },
}
