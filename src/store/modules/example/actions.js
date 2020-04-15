import { SAMPLE as api} from '../../../api'
import {
  ACTION_EXAMPLE_ONE,
  ACTION_EXAMPLE_TWO,
  MUTATION_EXAMPLE_ONE,
  MUTATION_EXAMPLE_TWO
} from './consistent'

/* 
依照 db.json 的內容產生 REST API
json-server db.json

如果要監聽 db.json 的變化，請加 --watch 或 -w
json-server --watch db.json

默認 port 是 3000，如果要變更，請加 --port port值
json-server --watch db.json --port 7000

也可讀取遠端的 json 當作 db 使用
json-server http://example.com/db.json
*/

export default {
  [ACTION_EXAMPLE_ONE]: ({commit, dispatch}, payload) => {
    commit(MUTATION_EXAMPLE_ONE, payload)
    dispatch(ACTION_EXAMPLE_TWO)
  },
  [ACTION_EXAMPLE_TWO]: ({commit}, payload) => {
    const params = payload || {}
    api.sampleTwo(params).then((response) => {
      console.log(response)
    }).catch((err) => console.log(err))

    commit(MUTATION_EXAMPLE_TWO, payload)
  }
}