import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import Today from '@/components/Today.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/today',
    name: 'today',
    component: Today
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
