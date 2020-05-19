import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({ commit }, payload) => {
    api.getNotes(payload).then(({ data }) => {
      const infos = data && Object.entries(data[0]).length > 0 ? data[0] : []
      commit('setNoteInfos', infos)
    })
    .catch( (err) => console.log(err))
  },
  CREATE_NOTES: ({ dispatch }, payload) => {
    payload.forEach(element => {
      const params = {
        sealText: element.sealText 
      } 
      api.getNotes(params).then(({ data }) => {
        const oriData = data ? data[0] : []
        let updateData = oriData[element.kin] ? oriData[element.kin].slice() : []
        updateData.push(element.data)

        const dbParams = {
          ...oriData,
          [element.kin]: updateData,
          doc: element.sealText,
        }
      }) 
    })
  }
}
