// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import _ from 'lodash';
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.prototype._ = _
Vue.config.productionTip = false

const options = {
  extraHeaders: {"my-custom-header": 'abas'},
  withCredentials: true,
}

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:8080', options),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  //options: { path: "/my-app/" } //Optional options
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
