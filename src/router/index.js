import Vue from 'vue'
import Router from 'vue-router'

import routes from './route'
import { hasAccess } from '../helpers/route'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const router = new Router({
  mode: 'hash',
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
    next({ path: '/signin' })
  } else if (authRequired) {
    if (hasToken && hasAccess(to, roles)) {
      next()
    } else {
      next({ path: '/403' })
    }
  } else {
    next()
  }
})

export default router
