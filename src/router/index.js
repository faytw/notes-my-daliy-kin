import Vue from 'vue'
import Router from 'vue-router'

import routes from './route'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

function hasAccess(route = {}, roles = []) {
  return roles.some((role) => {
    const allowed = (route.meta && route.meta.allowed) || []
    return allowed.includes(role)
  });
}

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const {
    user_token: token,
    user_infos: userInfos = '{}',
  } = localStorage

  const hasToken = token && token !== 'undefined'
  const authRequired = to.matched.some(record => record.meta.requiresAuth)
  const infos = JSON.parse(userInfos)
  const roles = infos.roles || []

  if (to.path === '/') {
    next({ path: '/index' })
  } else if (authRequired) {
    if (hasToken && hasAccess(to, roles)) {
      next()
    } else {
      if (to.path === `/relationships/list/${token}`) {
        next({path: '/relationships/computer'})
      } else {
        const page = from.path
        next({ path: `${page}` })
      }
    }
  } else {
    next()
  }
})

export default router
