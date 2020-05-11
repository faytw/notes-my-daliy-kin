import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({ commit }, payload) => {
    console.log(payload)
    api.getNotes(payload).then(({ data }) => {
      const infos = data[0]
      commit('setNoteInfos', infos)
    })
    .catch( (err) => console.log(err))
  },
  CREATE_NOTES: ({ dispatch }, payload) => {
    payload.forEach(element => {
      const params = {
        sealText: element.sealText 
      } 
      api.getNotes(params).then(( {data} ) => {
        const oriData = data ? data[0] : {}
        let updateData = { ...oriData[element.kin] }
        if (updateData.hasOwnProperty('data')) {
          updateData.data.push(element.data)
        } else {
          updateData.data = []
          updateData.data.push(element.data)
        }
        const dbParams = {
          ...oriData,
          [element.kin]: updateData,
          doc: element.sealText,
        }
        api.createNotes(dbParams)
      }) 
    });
  }
}
