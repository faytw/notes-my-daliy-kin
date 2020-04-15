import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules';

Vue.use(Vuex)

const RESET_STATE = 'RESET_STATE'
const RESET_STATE_DONE = 'RESET_STATE_DONE'

// Refer of the initialState: https://github.com/vuejs/vuex/issues/1118#issuecomment-496238029
const initialState = {};
Object.keys(modules).forEach((moduleName) => {
  initialState[moduleName] = { ...modules[moduleName].state }
})
const actions = {
  [RESET_STATE]: ({ commit }) => {
    commit('RESET_STATE_DONE', initialState)
  },
};
const mutations = {
  [RESET_STATE_DONE]: (state) => {
    Object.keys(initialState).forEach((key) => {
      Object.assign(state[key], initialState[key])
    })
  },
}

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions,
  modules,
  mutations,
  strict: debug,
})

if (module.hot) {
  module.hot.accept([
    './modules',
  ], () => {
    store.hotUpdate({
      modules,
    })
  })
}

export default store
