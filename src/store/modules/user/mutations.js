export default {
  setUserInfos: (state, data) => {
    console.log('setUserInfos')
    const { id, email, roles, name } = data
    state.id = id
    state.email = email
    state.roles = roles
    state.name = name
  },
}
