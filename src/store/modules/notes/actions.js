import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: ({ commit, dispatch }, payload) => {
    dispatch('OPEN_NOTES_LOADING', 'visible')
    api.getNotes(payload).then(({ data }) => {
      dispatch('CLOSE_NOTES_LOADING', 'hidden')
      const infos = data && Object.entries(data[0]).length > 0 ? data[0] : []
      commit('setNoteInfos', infos)
    })
    .catch( (err) => console.log(err))
  },
  CREATE_NOTES: ({ dispatch }, payload) => {
    dispatch('OPEN_NOTES_LOADING', 'visible')
    payload.forEach(element => {
      const params = {
        sealText: element.sealText 
      } 
      let dbParams = {}
      api.getNotes(params).then(({ data }) => {
        const oriData = data ? data[0] : []
        let updateData = oriData[element.kin] ? oriData[element.kin].slice() : []
        updateData.push(element.data)

        dbParams = {
          ...oriData,
          [element.kin]: updateData,
          doc: element.sealText,
        }
        api.createNotes(dbParams).then(() => {
          dispatch('CLOSE_NOTES_LOADING', 'hidden')
          dispatch('CREATED_NOTES_SUCCESSED', 'visible')
        })
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
