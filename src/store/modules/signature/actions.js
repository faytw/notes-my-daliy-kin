export default {
  INIT_APP_DATA: ({
    commit
  }, data) => {
    const initMainSeal = data.filter(seal => seal.position === 'middle')[0]
    const { kin } = initMainSeal
    commit('setSignatureInfos', data)
    commit('setDisplayKin', kin)
  },
  SET_DISPLAY_KIN: ({ commit }, kin) => {
    commit('setDisplayKin', kin)
  }
}
