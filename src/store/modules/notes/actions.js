import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({ commit }, payload) => {
    const { userId } = payload
    api.getNotes(payload).then((data) => {
      const temp = []
      Object.keys(data).forEach((key) => {
        const note = data[key]
        temp.push(note)
      })
      const infos = temp.filter((elm) => elm.author === userId)
      commit('setNoteInfos', infos)
    })
    .catch( (err) => console.log(err))
  },
  CREATE_NOTES: ({ dispatch }, payload) => {
    dispatch('OPEN_NOTES_LOADING', true)
    payload.forEach(element => {     
      api.createNotes(element).then(() => {
        dispatch('CLOSE_NOTES_LOADING', false)
        dispatch('CREATED_NOTES_SUCCESSED', true)
      })
    })
  },
  CREATED_NOTES_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'note.created.success',
    }
    commit('notification/setNotifyStatus', payload, { root: true })
    commit('notification/setNotifyConfigs', configs, { root: true })
  },
  UPDATED_NOTES_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'note.updated.success',
    }
    commit('setNotifyStatus', payload)
    commit('setNotifyConfigs', configs)
  },
  REMOVED_NOTES_SUCCESSED: ({ commit }, payload) => {
    const configs = {
      type: 'success',
      message: 'note.removed.success',
    }
    commit('setNotifyStatus', payload)
    commit('setNotifyConfigs', configs)
  },
  OPEN_NOTES_LOADING: ( {commit} , payload) => {
    const configs = {
      type: 'info',
      message: 'loading',
    }
    commit('notification/setNotifyStatus', payload, { root: true })
    commit('notification/setNotifyConfigs', configs, { root: true })
  },
  CLOSE_NOTES_LOADING: ({ commit }, payload) => {
    commit('notification/setNotifyStatus', payload, { root: true })
  },
}
