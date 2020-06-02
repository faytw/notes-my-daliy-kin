const authRoles = ['admin', 'user']

export default {
  showRelationshipsLogs: (state) => {
    return authRoles.includes(state.role)
  },
  showRelationshipsSaveButton: (state) => {
    return authRoles.includes(state.role)
  },
  showNotebookButton: (state) => {
    return authRoles.includes(state.role)
  },
  showAddNotesButton: (state) => {
    return authRoles.includes(state.role)
  }
}
