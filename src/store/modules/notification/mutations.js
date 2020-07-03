export default {
  setNotifyStatus: (state, payload) => {
    state.active = payload
  },
  setNotifyConfigs: (state, payload) => {
    state.configs = {
      ...state.configs,
      ...payload,
    }
  },
}
