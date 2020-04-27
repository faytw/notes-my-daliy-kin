import Vue from 'vue'
import Router from 'vue-router'

import Notes from '@/components/Notes.vue'
import Signature from '@/components/Signature.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Signature,

  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
  },
  {
    path: '/signature',
    name: 'signature',
    component: Signature,

  },
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
