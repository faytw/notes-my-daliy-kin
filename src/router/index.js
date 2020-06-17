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

const ALL = ['user','visitor','developer']
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
        meta: { roles: ALL },
      },
      {
        path: '/notebook',
        name: 'notebook',
        component: Notebook,
        meta: { roles: NO_VISITOR },
        children: [
          {
            path: '/notebook/notes',
            name: 'notes',
            component: Notes,
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
            meta: { roles: ALL },
          },
          {
            path: 'list',
            name: 'relationshipList',
            component: RelationshipList,
            meta: { roles: NO_VISITOR },
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

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
