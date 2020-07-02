const NAV = {
  showNotebookButton: ['user', 'developer'],
}

const DISPLAY = {
  showAddNotesButton: ['user', 'developer'],
  showRelationshipsSaveButton: ['user', 'developer'],
  showRelationshipsLogs: ['user', 'developer'],
}

export const ALL = ['user', 'visitor', 'developer']
export const NO_VISITOR = ['user', 'developer']

const permission = {
  list: NO_VISITOR,
  notes: NO_VISITOR,
}

export const checkPermission = (routeName = '', roles = []) => {
  const allowed = permission[routeName] || []
  return roles.some((role) => {
    return allowed.includes(role)
  })
}

export default {
  NAV,
  DISPLAY,
  ALL,
  NO_VISITOR,
  checkPermission
}
