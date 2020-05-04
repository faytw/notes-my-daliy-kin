import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({commit}) => {
    api.getNotes().then(({ data }) => {
        commit('setNoteInfos', data)
      }).catch((err) => console.log(err))
  },
  CREATE_NOTES: ({ dispatch }, payload) => {
    api.createNotes(payload).then(() => {
      dispatch('GET_NOTES')
    }).catch((err) => console.log(err))
  }
}
