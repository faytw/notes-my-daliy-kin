import Home from '@/components/Home.vue'
import Notes from '@/components/Notes.vue'
import Notebook from '@/components/Notebook.vue'
import Signature from '@/components/Signature.vue'
import SignIn from '@/components/SignIn.vue'
import Relationships from '@/components/Relationships.vue'
import RelationshipComputer from '@/components/RelationshipComputer.vue'
import RelationshipList from '@/components/RelationshipList.vue'

import { ALL, NO_VISITOR } from '@/helpers/auth'

export const routes = [{
    path: '/signin',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [{
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
      },
      {
        path: '/notebook/notes',
        name: 'notes',
        component: Notes,
        meta: {
          requiresAuth: true,
          allowed: NO_VISITOR
        },
      },
      {
        path: '/relationships',
        component: Relationships,
        children: [{
            path: 'computer',
            name: 'relationshipComputer',
            component: RelationshipComputer,
            meta: {
              requiresAuth: true,
              allowed: ALL
            },
          },
          {
            path: 'list/:id',
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
]

export default routes
