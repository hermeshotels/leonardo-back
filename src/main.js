// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import store from './store'
import ErmDate from './filters/date.js'
import 'muse-ui/dist/muse-ui.css'
import VueSocketio from 'vue-socket.io'
import config from './config.js'
Vue.use(MuseUI)
Vue.use(ErmDate)
Vue.use(VueSocketio, config.SOCKETURL, store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
