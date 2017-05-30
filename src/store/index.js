import Vue from 'vue'
import Vuex from 'vuex'
import {sync} from 'vuex-router-sync'
import realtime from './modules/realtime'
import settings from './modules/settings'
import router from '../router'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    realtime,
    settings
  }
})

sync(store, router)

export default store
