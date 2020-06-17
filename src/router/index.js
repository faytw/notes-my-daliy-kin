import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import Notes from '@/components/Notes.vue'
import Notebook from '@/components/Notebook.vue'
import Signature from '@/components/Signature.vue'
import SignIn from '@/components/SignIn.vue'
import Relationships from '@/components/Relationships.vue'
import RelationshipStepper from '@/components/RelationshipStepper.vue'
import RelationshipList from '@/components/RelationshipList.vue'


Vue.use(Router)

const ALL = ['user', 'visitor', 'developer']
const NO_VISITOR = ['user', 'developer']

const routes = [
  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [
      {
        path: '/signature',
        name: 'signature',
        component: Signature,
        meta: {           
          requiresAuth: true, 
          allowed: ALL 
        },
      },
      {
        path: '/notebook',
        name: 'notebook',
        component: Notebook,
        meta: { 
          requiresAuth: true, 
          allowed: NO_VISITOR 
        },
        children: [
          {
            path: '/notebook/notes',
            name: 'notes',
            component: Notes,
            meta: { 
              requiresAuth: true, 
              allowed: NO_VISITOR 
            },
          },
        ]
      },
      {
        path: '/relationships',
        component: Relationships,
        children: [
          {
            path: 'computer',
            name: 'relationshipStepper',
            component: RelationshipStepper,
            meta: {           
              requiresAuth: true, 
              allowed: ALL 
            },
          },
          {
            path: 'list',
            name: 'relationshipList',
            component: RelationshipList,
            meta: { 
              requiresAuth: true, 
              allowed: NO_VISITOR 
            },
          }
        ]
      },
    ]
  },
  {
    path: '/signin',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/',
    name: 'index',
    component: Home,
  }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

function hasAccess(route = {}, roles = []) {
  return roles.some((role) => {
    const allowed = (route.meta && route.meta.allowed) || []
    return allowed.includes(role);
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
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const infos = JSON.parse(userInfos);
  const roles = infos.roles || []

  if (to.path === '/') {
    next({ path: '/signin' })
  } else if (authRequired) {
    if (hasToken && hasAccess(to, roles)) {
      next()
    }
  } else {
    next()
  }
})

export default router
