// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import _ from 'lodash';
import VueSocketIO from 'vue-socket.io'

Vue.prototype._ = _
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://109.231.24.160:8080',
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  },
  options: {
    extraHeaders: {'my-custom-header': 'abas'},
    withCredentials: true,
  }
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
