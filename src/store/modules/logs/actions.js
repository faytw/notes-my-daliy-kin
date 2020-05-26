import { LOGS as api } from '../../../api'
  
export default {
  GET_USER_LOGS: ({ commit }, payload) => {
    const { user } = payload
    api.getLogs().then(({ data }) => {
      const infos = data.filter((log) => log.user === user)
      commit('setLogsInfos', infos)
    })
    .catch((err) => console.log(err))
  },
  CREATE_LOGS: ({ dispatch }, payload) => {
    api.getLogs().then(({ data }) => {
      const dbParams = data.slice()
      dbParams.push(payload)
      api.createLogs(dbParams)
    }) .catch((err) => console.log(err))
  },
}
