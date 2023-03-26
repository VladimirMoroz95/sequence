import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Gameboard from '@/components/gameboard'
import SignIn from '@/views/signIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/gameboard',
      name: 'gameboard',
      component: Gameboard
    }
  ]
})
