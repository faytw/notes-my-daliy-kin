export default {
  setNotifyStatus: (state, payload) => {
    state.status = payload
  },
  setNotifyConfigs: (state, payload) => {
    state.configs = {
      ...state.configs,
      ...payload,
    }
  },
}
