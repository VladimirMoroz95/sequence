import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
import Gameboard from '@/components/gameboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gameboard',
      name: 'gameboard',
      component: Gameboard
    }
  ]
})
