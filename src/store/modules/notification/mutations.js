export default {
  setNotifyStatus: (state, payload) => {
    state.configs = {
      ...state.configs,
      ...payload,
    }
  },
}
