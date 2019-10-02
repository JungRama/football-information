import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {name: 'matches'}
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import(/* webpackChunkName: "matches" */ './views/Matches.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import(/* webpackChunkName: "teams" */ './views/Teams.vue')
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import(/* webpackChunkName: "favorite" */ './views/Favorite.vue')
    }
  ]
})
