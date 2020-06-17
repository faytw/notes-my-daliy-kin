export default {
  setUserInfos: (state, data) => {
    const { id, email, roles, name } = data
    state.id = id
    state.email = email
    state.roles = roles
    state.name = name
  },
  setUserToken: (state, token) => {
    state.token = token
  },
}
