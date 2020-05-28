import { LOGS as api } from '../../../api'
  
export default {
  GET_USER_LOGS: ({ commit }, payload) => {
    const { user } = payload
    api.getLogs().then(({ data }) => {
      const infos = data.filter((log) => log.user === user)
      commit('setLogsInfos', infos)
      commit('setDataTableItems', infos)
    })
    .catch((err) => console.log(err))
  },
  CREATE_LOGS: ({ dispatch }, payload) => {
    api.getLogs().then(({ data }) => {
      const dbParams = data.slice()
      dbParams.push(payload)
      api.createLogs(dbParams).then(() => {
        //TODO: set status to close popup
      })
    }) .catch((err) => console.log(err))
  },
}
