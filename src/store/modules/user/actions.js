import { USER as api } from '../../../api'
import router from '../../../router'

export default {
  GET_USER_TOKEN: ({ commit }, payload) => {
    api.getUserInfos(payload).then(( data ) => {
      const {
        id: token,
        infos
      } = data

      localStorage.setItem('user_token', token)
      localStorage.setItem('user_type', 1)
      localStorage.setItem('user_infos', JSON.stringify(infos))

      commit('setUserToken', token)

      router.push({ path: 'index' })
    })
    .catch((error) => {
      const configs = {
        type: 'error',
        message: error,
      }
      localStorage.setItem('user_type', -1)
      commit('notification/setNotifyStatus', true, { root: true })
      commit('notification/setNotifyConfigs', configs, { root: true })
    })
  },
  GET_USER_INFOS_WITH_ID: ({ commit }, payload) => {
    const {
      id, 
      type
    } = payload

    if (type === 1) {
      api.getUserInfosWithId(id).then((data) => {      
        commit('setUserInfos', data)
      })
      .catch((err) => console.log(err))
    } else if (type === '0'){
      const {
        user_token: id,
        user_infos
      } = localStorage
      const infos = JSON.parse(user_infos)
      const visitorData = {
        id,
        ...infos
      }
      commit('setUserInfos', visitorData)
    } else {
      router.push({ path: 'signin' })
    }
  },
  GET_VISITOR_INFOS: ({ commit }, payload) => {
    const {
      id: token,
      ...infos
    } = payload

    localStorage.setItem('user_token', token)
    localStorage.setItem('user_type', 0)
    localStorage.setItem('user_infos', JSON.stringify(infos))

    commit('setUserToken', token)
    commit('setUserInfos', payload)

    router.push({ path: 'index' })
  },
  CLEAR_USER_INFOS: ({ commit }) => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_type')
    localStorage.removeItem('user_infos')

    commit('clearUserInfos')

    router.push({ path: 'signin' })
  }
}
