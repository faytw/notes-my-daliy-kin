export const hasAccess = (route = {}, roles = []) => {
  return roles.some((role) => {
    const allowed = (route.meta && route.meta.allowed) || []
    return allowed.includes(role)
  })
}

export default {
  hasAccess
}
