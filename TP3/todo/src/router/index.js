import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/exo1',
    name: 'exo1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Exo1View.vue')
  },

  {
    path: '/exo2',
    name: 'exo2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Exo2View.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
