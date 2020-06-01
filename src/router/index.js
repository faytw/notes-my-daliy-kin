import Vue from 'vue'
import Router from 'vue-router'

import Notes from '@/components/Notes.vue'
import Notebook from '@/components/Notebook.vue'
import Signature from '@/components/Signature.vue'
import Relationships from '@/components/Relationships.vue'
import RelationshipStepper from '@/components/RelationshipStepper.vue'
import RelationshipList from '@/components/RelationshipList.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Signature,
  },
  {
    path: '/notebook/create-notes',
    name: 'notes',
    component: Notes,
  },
  {
    path: '/signature',
    name: 'signature',
    component: Signature,
  },
  {
    path: '/notebook',
    name: 'notebook',
    component: Notebook,
  },
  {
    path: '/relationships',
    component: Relationships,
    children: [
      {
        path: 'computer',
        name: 'relationshipStepper',
        component: RelationshipStepper
      },
      {
        path: 'list',
        name: 'relationshipList',
        component: RelationshipList
      }
    ]
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
