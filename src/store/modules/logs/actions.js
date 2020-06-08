import { LOGS as api } from '../../../api'
  
export default {
  GET_USER_LOGS: ({ commit, dispatch }, payload) => {
    dispatch('OPEN_LOGS_LOADING', 'visible')
    const { user } = payload
    api.getLogs().then(({ data }) => {
      dispatch('CLOSE_LOGS_LOADING', 'hidden')
      const infos = data.filter((log) => log.user === user)
      commit('setLogsInfos', infos)
      commit('setDataTableItems', infos)
    })
    .catch((err) => console.log(err))
  },
  CREATE_LOGS: ({ dispatch }, payload) => {
    dispatch('OPEN_LOGS_LOADING', 'visible')
    api.getLogs().then((res) => {
      console.log('CREATE_LOGS', payload, res)
      const dbParams = data.slice()
      dbParams.push(payload)
      api.createLogs(dbParams)
        .then(() => {
          dispatch('CLOSE_LOGS_LOADING', 'hidden')
          dispatch('CREATED_LOGS_SUCCESSED', 'visible')
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
  },
  OPEN_LOGS_LOADING: ({ commit } , payload) => {
    const configs = {
      type: 'info',
      message: 'loading',
    }
    commit('notification/setNotifyStatus', payload, { root: true })
    commit('notification/setNotifyConfigs', configs, { root: true })
  },
  CLOSE_LOGS_LOADING: ({ commit }, payload) => {
    commit('notification/setNotifyStatus', payload, { root: true })
  },
  CREATED_LOGS_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'logs.created.success',
    }
    commit('notification/setNotifyStatus', payload, { root: true })
    commit('notification/setNotifyConfigs', configs, { root: true })
  },
  UPDATED_LOGS_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'logs.updated.success',
    }
    commit('setNotifyStatus', payload)
    commit('setNotifyConfigs', configs)
  },
  REMOVED_LOGS_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'logs.removed.success',
    }
    commit('setNotifyStatus', payload)
    commit('setNotifyConfigs', configs)
  },
}
