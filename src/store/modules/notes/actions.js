import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({commit}) => {
    api.getNotes()
      .then(({
        data
      }) => {
        commit('setNoteInfos', data)
      })
      .catch((err) => console.log(err))
  },
}
