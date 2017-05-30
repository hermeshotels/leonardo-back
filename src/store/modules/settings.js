import Vue from 'vue'
import Promise from 'promise'
import settingsApi from '../../api/settings'

const state = {
  languages: [
    'Italian',
    'English',
    'Deutsch',
    'Francais',
    'Espanol',
    'Chinese',
    'Russian',
    'Portugues'
  ],
  currentSettingsLang: 'italian',
  settings: {
    general: {
      italian: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      english: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      deutsch: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      francais: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      espanol: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      chinese: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      russian: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      },
      portugues: {
        subTitle: '',
        UATrackingId: '',
        chatName: '',
        chatMessage: ''
      }
    },
    analytics: {
      ecommerce: true,
      events: true
    },
    payment: {
      creditCard: true,
      bankTransfer: false,
      dayBefore: 10,
      transferBefore: 10,
      iban: '',
      bankName: '',
      ownerName: '',
      abiCode: '',
      cabCode: '',
      swiftCode: ''
    },
    look: {
      primaryColor: '#2196f3',
      secondaryColor: '#2196f3',
      bannerUrl: '',
      logoUrl: '',
      hideLogo: false,
      hideName: false,
      hidePromo: false
    },
    scraping: {
      uri: ''
    },
    chat: {
      active: false
    }
  }
}

const getters = {
  settings (state) {
    return state.settings
  },
  settingsLanguages (state) {
    return state.languages
  },
  currentSettingsLang (state) {
    return state.currentSettingsLang
  }
}

const mutations = {
  setSettings (state, settings) {
    Vue.set(state.settings, 'general', settings.general)
    Vue.set(state.settings, 'look', settings.look)
    Vue.set(state.settings, 'payment', settings.payment)
    if (settings.chat) {
      Vue.set(state.settings, 'chat', settings.chat)
    }
    if (settings.scraping) {
      Vue.set(state.settings, 'scraping', settings.scraping)
    }
  },
  setGeneralData (state, payload) {
    state.settings.general[state.currentSettingsLang][payload.field] = payload.value
  },
  setPaymentData (state, payload) {
    state.settings.payment[payload.field] = payload.value
  },
  setLookData (state, payload) {
    state.settings.look[payload.field] = payload.value
  },
  setScrapeData (state, payload) {
    state.settings.scraping[payload.field] = payload.value
  },
  setAnalyticsData (state, payload) {
    state.settings.analytics[payload.field] = payload.value
  },
  setCurrentSettingsLang (state, language) {
    state.currentSettingsLang = language.toLowerCase()
  },
  setChatData (state, payload) {
    state.settings.chat[payload.field] = payload.value
  }
}

const actions = {
  getSettings ({commit, rootState}) {
    return new Promise((resolve, reject) => {
      settingsApi.getSettings(rootState.route.params.hotel, (error, settings) => {
        if (error) {
          reject(error)
        }
        if (settings && settings.general && settings.look && settings.payment) {
          commit('setSettings', settings)
          resolve(settings)
        }
      })
    })
  },
  saveSettings ({state, commit, rootState}) {
    return new Promise((resolve, reject) => {
      settingsApi.saveGeneral({
        hotelId: rootState.route.params.hotel,
        general: state.settings.general,
        payment: state.settings.payment,
        look: state.settings.look,
        analytics: state.settings.analytics,
        scraping: state.settings.scraping,
        chat: state.settings.chat
      }, (error, generalSettings) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        console.log('success')
        resolve(generalSettings)
      })
    })
  }
}

export default {
  getters,
  state,
  actions,
  mutations
}
