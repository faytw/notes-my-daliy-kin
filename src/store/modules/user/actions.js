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
      
      router.push({path: 'signature'})
    })
    .catch((err) => console.log(err))
  },
  GET_USER_INFOS_WITH_ID: ({ commit }, payload) => {
    const {
      id, 
      type
    } = payload

    if(type) {
      api.getUserInfosWithId(id).then((data) => {      
        commit('setUserInfos', data)
      })
      .catch((err) => console.log(err))
    } else {
      const {
        user_token: id,
        user_infos: infos
      } = localStorage

      const visitorData = {
        id,
        ...infos
      }
      console.log(visitorData)
      commit('setUserInfos', visitorData)
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

    console.log('GET_VISITOR_INFOS', token)

    commit('setUserToken', token)
    commit('setUserInfos', payload)

    router.push({path: 'signature'})
  }
}
