export default {
  SET_NOTIFY_STATUS: ({ commit }, payload) => {
    commit('setNotifyStatus', payload)
  },
  SET_NOTIFY_CONFIGS: ({ commit }, payload) => {
    commit('setNotifyConfigs', payload)
  },
}
