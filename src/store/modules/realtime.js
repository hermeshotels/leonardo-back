import Vue from 'vue'
const state = {
  currentSession: null,
  sessions: []
}

const getters = {
  sessions (state) {
    return state.sessions
  },
  currentSession (state) {
    return state.currentSession
  }
}

const mutations = {
  SOCKET_BACKNEWSESSION (state, session) {
    state.sessions.push(session)
  },
  SOCKET_BACKENDSESSION (state, sessionid) {
    let session = state.sessions.findIndex((session) => {
      return session.id === session.id
    })
    if (state.currentSession && sessionid === state.currentSession.sessionid) {
      state.currentSession = null
    }
    if (session > -1) {
      state.sessions.splice(session, 1)
    }
  },
  SOCKET_BACKSETFILTERS (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'filters', payload.data.filters)
      Vue.set(session, 'position', payload.data.position)
    }
  },
  SOCKET_BACKSETROOMS (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'rooms', payload.data.rooms)
      Vue.set(session, 'position', payload.data.position)
    }
  },
  SOCKET_BACKSELECTROOM (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'selectedRooms', [])
      session.selectedRooms.push(payload.data.room)
    }
  },
  SOCKET_BACKEXTRASERVICES (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'services', payload.serives)
      Vue.set(session, 'position', payload.data.position)
    }
  },
  SOCKET_BACKNEWMESSAGE (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      if (!session.chat) {
        Vue.set(session, 'chat', [])
      }
      session.chat.push(payload)
    }
  },
  SOCKET_BACKUSERNAMESELECTED (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'userName', payload.data.username)
    }
  },
  SOCKET_REALTIMESHOT (state, payload) {
    let session = state.sessions.find((session) => {
      return session.sessionid === payload.sessionid
    })
    if (session) {
      Vue.set(session, 'latestShot', payload.shotData)
    }
  },
  newMessage (state, message) {
    let session = state.sessions.find((session) => {
      return session.sessionid === message.sessionid
    })
    if (session) {
      if (!session.chat) {
        Vue.set(session, 'chat', [])
      }
      session.chat.push(message)
    }
  },
  setCurrentSession (state, session) {
    state.currentSession = session
  }
}

export default {
  state,
  getters,
  mutations
}
