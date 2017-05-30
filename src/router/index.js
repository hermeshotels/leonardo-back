import Vue from 'vue'
import Router from 'vue-router'
import Settings from '@/components/Settings/Settings'
import RealtimeWrapper from '@/components/Realtime/RealtimeWrapper'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hotel/:hotel/settings/language/:language',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/hotel/:hotel/realtime/language/:language',
      name: 'Realtime',
      component: RealtimeWrapper
    }
  ]
})
