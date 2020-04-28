import {
  NOTES as api
} from '../../../api'

export default {
  GET_NOTES: () => {
    api.getNotes().then((response) => {
      //commit to set state.notes
    }).catch((err) => console.log(err))
  },
}
