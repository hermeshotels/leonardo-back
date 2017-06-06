<template>
<div class="erm-realtime-wrapper">
    <!-- start of sidebar -->
    <div class="erm-realtime-side">

      <div class="erm-realtime-top">
        <mu-flexbox align="center" justify="middle" class="full-height">
          <mu-flexbox-item>
            <mu-switch label="Attiva chat" class="erm-chat-switch" v-model="chatActive" />
          </mu-flexbox-item>
        </mu-flexbox>
      </div>

      <div class="erm-realtime-session-list">
        <mu-list class="erm-session-list">
          <mu-sub-header style="color: rgba(255, 255, 255, .87)">Sessioni attive</mu-sub-header>
          <mu-list-item :title="getUsername(session)" v-for="session in sessions" :key="session.sessionid" @click="setSession(session)">
            <mu-avatar src="https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fusers-6%2F100%2F654854-user-women-512.png&f=1" slot="leftAvatar"/>
            <span slot="describe">
              <span style="color: rgba(255, 255, 255, .87)">{{session.position}} - {{session.time | date('HH:MM')}}</span>
              <div class="erm-realtime-new-message" v-if="getSessioNewMessages(session) > 0">{{getSessioNewMessages(session)}} nuovo messaggio</div>
            </span>
            <mu-icon value="chat_bubble" style="color: rgba(255, 255, 255, .87)" slot="right"/>
          </mu-list-item>
        </mu-list>
      </div>

    </div>
    <!-- end of sidebar-->
    <!-- start of chat -->
    <div class="erm-realtime-chat">
      <mu-flexbox align="center" justify="middle" class="full-height" v-if="!currentSession">
        <mu-flexbox-item class="erm-no-session">
          <!-- Invio segnale satellitare icon by Icons8 -->
          <img class="icon icons8-Invio-segnale-satellitare" width="100" height="100" src="data:image/png;base64,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">
          <h1>
          Seleziona una sessione <br>
          <small>per iniziare a interagire con i tuoi utenti.</small>
          </h1>
        </mu-flexbox-item>
      </mu-flexbox>
      <session-chat v-if="currentSession" :session="currentSession"></session-chat>
    </div>
    <!-- end of chat -->
    <!-- start of details -->
    <div class="erm-realtime-details">

      <mu-flexbox align="center" justify="middle" class="full-height" v-if="!currentSession">
        <mu-flexbox-item class="erm-no-session">
          <!-- Invio segnale satellitare icon by Icons8 -->
          <img class="icon icons8-Posizione-utente" width="100" height="100" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFC0lEQVR4nO3cz0vjaBgH8PlT/GtWD2XpHOxhnMPAuBdB0IMoe1g97OIEutOBUNCxHtpD/QEa2KUjshVhsks1hNKKsYWtBCwWWiwbMGxhwvrsQZK+jbX2R/LmTfo88L1J6duP76+8b/vqFRYWFhYWFtZ41eSHHGCGD4IwFtdA5lMK8Nkqpo/MpxT3QfhsFVTtAdNH+GwVQVgKgjAWBGEsCMJYEISxIAhjQRDGgiCMBUEYC4IwFgRhLAjCWBCEsYwdiHitg1BoQkKsQUKsgVBowvGV5vn7GisQ8VoHLqPCm3i+54EQl1FBrrYQxK0oDQO4jArhmDTQSR2XURHEjV5h7xHvtxX45agGSVkHoWSAUDIgKesQPanDXKrc8bdv4nkQr3UEcQqD7BVvN4rAf23Cl8pDzyRlHab5NmI4JlFHCRyI0jBgdqtoNWpxpwJCyXgRg8zKgdrRU5SGgSDDhsu0P8yVA3UgiOdQ1oQKggwTudqyhqppPj9wz7Dn7Ua7p9FafQUKhOwdn3PaSBhfKg+we9Gi3ksCBWKuquZS5ZExzCzuVKwJHkEGiHitWw2JntQdA+G/Nq3XpbGjDwxI+rxuNSQp646BCCXDet2EWEOQfpMQa1ZDdi9aCMISyKirK3totiMwIEKh6cqQRa600ud1BOk3NCZ1odBEkEHixrLXfOgYjklUHqEECoTcGDoxbCVlHb7/9XHnv7xXptKGQIHI1fZ4P83nR15dvd9uf3mG1qlioEBU7QHWhIojDxd/+q39wdDqHYEEURpGx8HUoChCyYCVA9UaqvDxuwMhh67JD48HVP3MKUlZ73jCG45J1C9ABBJE1bof4S7uVCB6Urd28kLJgN2LFnzOabC4U7F6hdkzaCxzxwZE1R6HL3JO6TfzKcWz2yeBBiF7y0sw4ZgEy3tlTy42jB0IGaHQhPR5Hfhs1bosd3ylUZ24EcRHQRDGMhYgSsOAhFgDLqPCfEqB2a0ihGMShGMSzG4VYXmvDGtCBRJiDa+SuonAZ6vWhz/oKsurf6LAgZgQ3RBCUQki8SK82y7DXFqFubQKP6T+hpnNSwhFu6PRvucbKJDjK+3JZnBm8xIW9m+AO70H/uwbbMj/PZuf/9Bg6fAWXn/qfI1wTKK2SQwMSEKsdfSKmc1LWD266wnQK6tHd09g8Ai3j9h346GoBEuHt0ND2LN0ePtkfkGQHiExIvEicKf3jmGY4U7vIRIvUkHxNQh50yQSL744R4wS/uxbB4pbV4J8CyIUmhD+KFHBeA7FjYnelyDkd0BCUcmVYaoXCrn6QhDbm3ZyAu83q0d3rq28fAeiNAxreTuzeUkdw8y77fb1ICcft/gOhHzDo+wzRg13eu9KL/EdiPm7tpF40TMMM+bG0cm5xFcg5OWFhf0bz0F+/L39FQinhi1fgZD7jo9//us5CLnicmpf4isQc1ceikqeY9iHLacu0/kKZHnvcWXz+lMeFvZvmIgJ4tTjFF+BkD8IwFqcmth9BfLSr/kgCGWQcQiCMBYEYSwIwlgQhLEgCGNBEMaCIIwFQRgLgjAWBGEsCMJYEISxIAhjQRDGQgXEizjxT0Ce4XuRQIGMiuI1hisg363/teZFJrmzf0ZBsWGoXrXDcRCvamo9NzEsih1jaj034XV7AlHDoCCGyzUICmJQqn5QEINy9UJBDI+qGwpieFx2FMRgoLqgIIbXRaAgBis1tZ6bQAwsrHGo/wEW0f68L/serAAAAABJRU5ErkJggg==">
          <h1>
          Dettaglio sessione <br>
          <small>seleziona una sessione per iniziare.</small>
          </h1>
        </mu-flexbox-item>
      </mu-flexbox>

      <div class="erm-realtime-session-selected" v-if="currentSession">
        <div class="erm-realtime-detail-sec">
          <div class="erm-realtime-sec-title" ref="positionInfo">
            Posizione utente <i class="material-icons" @mouseenter="handleHover" @mouseleave="handleHoverExit">info</i>
            <mu-tooltip label="Attuale posizione dell'utente" :show="positionTip" :trigger="$refs.positionInfo" :touch="true" />
          </div>
          <div class="erm-realtime-detail-label">
            {{currentSession.position}}
          </div>
        </div>

        <div class="erm-realtime-detail-sec">
          <div class="erm-realtime-sec-title" ref="positionInfo">
            <i class="material-icons">translate</i> Lingua & Posizione
          </div>
          <div class="erm-realtime-detail-label">
            <img src="https://maxcdn.icons8.com/Color/PNG/24/Maps/Italy-24.png" title="Italia" width="24" height="24"> Italiano, Italia
          </div>
        </div>

        <div class="erm-realtime-detail-sec">
          <div class="erm-realtime-sec-title" ref="positionInfo">
            <i class="material-icons">tablet</i> Dispositivo & sistema
          </div>
          <div class="erm-realtime-detail-label">
            <img src="https://maxcdn.icons8.com/iOS7/PNG/25/Operating_Systems/mac_os_filled-25.png" title="Mac OS Filled" width="25" height="25">
            <img src="https://maxcdn.icons8.com/Color/PNG/24/Logos/windows_phone_store-24.png" title="Windows Phone Store" width="24" height="24">

            <img src="https://maxcdn.icons8.com/Color/PNG/24/Logos/firefox-24.png" title="Firefox" width="24" height="24" v-if="currentSession.browser === 'Firefox'">
            <img src="https://maxcdn.icons8.com/Color/PNG/24/Logos/chrome-24.png" title="Chrome" width="24" height="24" v-if="currentSession.browser === 'Chrome'">
            <img src="https://maxcdn.icons8.com/Color/PNG/24/Logos/safari-24.png" title="Safari" width="24" height="24" v-if="currentSession.browser === 'Safari'">
          </div>
        </div>

        <div class="erm-realtime-detail-sec">
          <div class="erm-realtime-sec-title" ref="positionInfo">
            <i class="material-icons">filter_list</i> Filtri di ricerca
          </div>
          <div class="erm-realtime-detail-label" >
            <mu-flexbox align="flex-start" :gutter="0" v-if="!currentSession.filters">
              <mu-flexbox-item class="erm-no-data">
                Nessun filtro selezionato
              </mu-flexbox-item>
            </mu-flexbox>
            <div class="erm-session-data" v-if="currentSession.filters">
              <mu-flexbox align="flex-start" :gutter="0">
                <mu-flexbox-item class="erm-filter-title">
                  Arrivo
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{currentSession.filters.arrival | date('DD MMM YY')}}
                </mu-flexbox-item>
              </mu-flexbox>

              <mu-flexbox align="flex-start" :gutter="0">
                <mu-flexbox-item class="erm-filter-title">
                  Partenza
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{currentSession.filters.departure | date('DD MMM YY')}}
                </mu-flexbox-item>
              </mu-flexbox>

              <mu-flexbox align="flex-start" :gutter="0">
                <mu-flexbox-item class="erm-filter-title">
                  Notti
                </mu-flexbox-item>
                <mu-flexbox-item>
                  3
                </mu-flexbox-item>
              </mu-flexbox>

              <mu-flexbox align="flex-start" :gutter="0">
                <mu-flexbox-item class="erm-filter-title">
                  Ospiti
                </mu-flexbox-item>
                <mu-flexbox-item>
                  {{adultsCount}} Ad. {{childsCount}} Ba. 1 Ca.
                </mu-flexbox-item>
              </mu-flexbox>
            </div>
          </div>
        </div>

        <div class="erm-realtime-detail-sec">
          <div class="erm-realtime-sec-title" ref="positionInfo">
            <i class="material-icons">attach_money</i> Camere e Tariffe
          </div>
          <div class="erm-realtime-detail-label">

          <mu-flexbox align="flex-start" :gutter="0" v-if="!currentSession.rooms">
            <mu-flexbox-item class="erm-no-data">
              Nessun camera inviata
            </mu-flexbox-item>
          </mu-flexbox>
          
          <mu-flexbox align="flex-start" :gutter="0" class="erm-realtime-room-wrapper" v-if="currentSession.rooms"  v-for="room in currentSession.rooms" :key="room.id">
            <mu-flexbox-item :grow="3">
              <div class="erm-realtime-room">
                <div class="erm-room-name">{{room.name}}</div>
                <div class="erm-room-lowest-rate">€ {{bestRate(room.rates).total}} <span class="erm-room-rate-name">{{bestRate(room.rates).name}}</span></div>       
              </div>
            </mu-flexbox-item>
            <mu-flexbox-item>
              <mu-icon-button icon="edit" @click="setRoom(room)"/>
            </mu-flexbox-item>
          </mu-flexbox>
          </div>
        </div>
      </div>

    </div>
    <!-- end of details -->
    <mu-dialog :open="overrideDialog" title="Override Tariffa" @close="toggleOverride">
      <!-- Ricerca GPS icon by Icons8 -->
      <mu-flexbox align="center" justify="middle" class="full-height" :gutter="30">
        <mu-flexbox-item>
          <img class="icon icons8-Ricerca-GPS" width="40" height="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADQ0lEQVRYhe3XXU/TUBgH8H6EfQQ+wr6ASW+2FjdXYIYbgy8x0ejV4oWJiYZesJ2yl1I0QcCXaKLeSLJIFLJg2AV2pz2tTkRGIrBFSDQCy0oGTLOExwutQUTYusPUxH/y3LXNL6fn5TkM8z+1hUf4NCfhAhfJhP605ZdwkUyIkzB8r0LdH+ARZjlJSx6CjWEYhuEkXLCBXqSKdb3MI9zSJpPiqcHsli+mTR0G0ItUkevVSnXjWDHtapOJ0T+xVClY23D+7kyZFpLKnBNkgkIPclbB2ga7aCAbnnMM82P0ilOLG7ATSAPZ0JyzI8gEXXqY29yNo4F0POd+AibIaipn7Ymj+bsdxRNW3ScGXln74WpFesKq2x/X5wOykeURZqkAvUgVe0YX12sBHoQU+syZ7vE16JmwwBcjq1SAwX5zMvm6WBPOrnN33kBrVIMdqxM4CUNrVIfedBm6x9fAHyd5OkDFyO61ep2MJI8wezSmg6C8nDsmmxepAIUEWTWXK3UDf4fkJAxUYHb8MW3LKXAvJHXg0ai2MbtSdQzcjaQO7FBI/qA9sB4kdaAvpj99pH9qGGgjW6MaXaAXqeLVkXdlGkB7C6J64rBi2nUsrn+hBfzd6m4ogbj+qZGVfOhIL1LF/bqZP45kxbRLSJBVJydK05A8wqcv3HtboQ2kimyTiXF76gN1IDUkK6Zd/rj+sd7upqlILvLiCCdh+GuRgQS5cnJ4ptx54xXceL5MFZd8XYT2PqN0XHHYivEItwRko3Tf3IDkXBW6Bqfh7K1paHSPnF2pAnqa/9yhkLwnrLodj54gm5PXnixVxha2wa7w+AfwxTToGV1crxdqw9r7jJIgE8SKaZdjHBfJhLqG3pSSc1XYCRxb2P7W0kcyIV9U2zwzNP2x91kBUjkLzOUK2K3a7EoVzOUKpHIW9E8sVbpuZsvtfUYpkCADPMItjmEM8/08TpDiMLZ+wdlA+1keYZaLZEJBxch2KCTvi2qbnITBH9O2gorxPqgYWUEmyBNW3Q2N2M4IsvH48kj+81643cCmxBNW3YKsz+++le1XQYXiXfegdF43Z+rd51I5C4QEpbvuQeEk7Gi7aNqv/ieATqspwL81XwGUydZTQ3YwnAAAAABJRU5ErkJggg=="> <br>
        </mu-flexbox-item>
        <mu-flexbox-item :grow="9">
          L'override di consente di selezionare una delle tariffe inviate all'utente e di modificarne
          il prezzo in tempo reale. <strong>L'utente potrà quindi concludere la prenotazione con il nuovo prezzo.</strong>
        </mu-flexbox-item>
      </mu-flexbox>
      <br><br>
      <div class="erm-room-rate-list" v-if="currentRoom">
        <mu-flexbox align="center" justify="middle" class="full-height" :gutter="30">
          <mu-flexbox-item :shrink="1">
            <mu-select-field v-model="selectedRate" label="Seleziona tariffa" style="width: 100%;">
              <mu-menu-item :value="rate" :title="rate.name" v-for="rate in currentRoom.rates" :key="rate.id"/>
            </mu-select-field>
          </mu-flexbox-item>
          <mu-flexbox-item :shrink="1" v-if="selectedRate">
            <mu-text-field hintText="0.00" v-model="selectedRate.total" label="Prezzo attuale" :disabled="true" style="width: 100%;" />
          </mu-flexbox-item>
          <mu-flexbox-item :shrink="1">
            <mu-text-field hintText="0.00" v-model="newPrice" label="Nuovo prezzo" style="width: 100%;" />
          </mu-flexbox-item>
          <mu-flexbox-item :shrink="1">
            <mu-raised-button label="Invia" @click="sendNewPrice" primary/>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      <mu-flat-button slot="actions" primary @click="toggleOverride" label="Annulla"/>
    </mu-dialog>
</div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800');
.erm-realtime-wrapper{
  height: calc(100% - 40px);
  width: 100%;
  display: flex;
  flex-grow: 1;
  font-family: 'Montserrat', sans-serif;
  .erm-realtime-side{
    background: #1d232a;
    width: 25%;
    color: #FFF;
    box-shadow: inset -15px 0 15px -15px #030405;
    .erm-realtime-top{
      height: 60px;
      padding-left: 1em;
      padding-right: 1em;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      .erm-chat-switch{
        .mu-switch-label{
          color: #FFF!important;
        }
      }
    }
    .erm-realtime-session-list{
      .mu-item-content{
        color: #FFF;
      }
      .mu-item-text{
        color: #FFF;
      }
    }
  }
  .erm-realtime-chat{
    background: #f4f8fa;
    flex-grow: 1;
  }
  .erm-no-session{
    text-align: center;
    h1{
      font-weight: 600;
      line-height: 20px;
      font-size: 20px;
      small{
        font-size: 70%;
        font-weight: 400;
        color: rgba(0,0,0,0.6);
      }
    }
  }
  .erm-realtime-details{
    width: 25%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    background: #FFF;
    border-left: 1px solid #dedede;
    box-shadow: -10px 0 10px -10px rgba(0,0,0,0.1);
    .erm-realtime-room-wrapper{
      .erm-realtime-room{
         margin-bottom: 10px;
      }
    }
    .erm-realtime-detail-sec{
      border-bottom: 1px solid #dedede;
      padding-bottom: 1em;
      padding-top: 1em;
      &:last-child{
        border-bottom: 0;
      }
      .erm-realtime-sec-title{
        color: #b9b9b9;
        font-size: 13px;
        font-weight: 600;
        padding-left: 1em;
        padding-right: 1em;
        margin-bottom: 15px;
        text-transform: uppercase;
        i{
          vertical-align: middle;
          font-size: 15px;
          margin-right: 10px;
        }
      }
      .erm-realtime-detail-label{
        padding-left: 1em;
        padding-right: 1em;
        font-size: 15px;
        img{
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .erm-filter-title{
        text-transform: uppercase;
        font-weight: 600;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .erm-realtime-room{
      line-height: 19px;
      .erm-room-name{
      }
      .erm-room-lowest-rate{
        font-size: 14px;
        color: red;
      }
    }
    .erm-no-data{
      color: #c62828;
    }
  }
  .erm-realtime-new-message{
    color: #F44336;
    font-size: 1.2rem;
  }
}
</style>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import SessionChat from './SessionChat'
import _ from 'lodash'
export default {
  components: {
    SessionChat
  },
  mounted () {
    this.$socket.emit('hotel-sing-up', {
      hotel: this.$route.params.hotel
    })
    this.getSettings()
    if (('Notification' in window)) {
      if (Notification.permission === 'granted') {
        this.notify = true
      }
      // notification supported
      if (Notification.permission !== 'denied') {
        Notification.requestPermission((permission) => {
          if (permission === 'granted') {
            this.notify = true
          }
        })
      }
    }
  },
  sockets: {
    backNewSession: function () {
      if (this.notify) {
        let not = new Notification('Nuovo utente', {
          icon: 'https://i.imgur.com/MLZSKyA.jpg',
          body: 'Nuovo utente connesso al BOL'
        })
        setTimeout(not.close.bind(not), 9000)
      }
    },
    backNewMessage: function (payload) {
      if (this.notify) {
        let not = new Notification('Nuovo messaggio chat', {
          icon: 'https://i.imgur.com/MLZSKyA.jpg',
          body: payload.message.substring(0, 100)
        })
        setTimeout(not.close.bind(not), 9000)
      }
    }
  },
  data () {
    return {
      positionTip: false,
      overrideDialog: false,
      currentRoom: null,
      selectedRate: null,
      newPrice: 0,
      notify: false
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentSession'
    ]),
    bestRate (rates) {
      return _.minBy(rates, 'total')
    },
    ...mapActions([
      'saveSettings',
      'getSettings'
    ]),
    handleHover () {
      this.positionTip = true
    },
    handleHoverExit () {
      this.positionTip = false
    },
    toggleOverride () {
      this.overrideDialog = false
    },
    setSession (session) {
      this.setCurrentSession(session)
      if (session.chat) {
        session.chat.forEach((message) => {
          message.new = false
        })
      }
    },
    setRoom (room) {
      this.currentRoom = room
      this.overrideDialog = true
    },
    getUsername (session) {
      if (session.userName && session.userName.length > 0) {
        return session.userName
      } else {
        return 'User' + session.sessionid
      }
    },
    sendNewPrice () {
      /*
      utente inserisce il nuovo prezzo per intero es: 300, il sistema,
      tramite l'array dailyCost può risalire al numero di notti della tariffa
      ed applica a questa, in base alla sua lunghezza il nuovo valore per notte
      dopodichè applica il nuovo valore complessivo sul totale della tariffa
      */
      let pricePerNight = parseFloat(this.newPrice / this.selectedRate.dailyPrices.length)
      this.selectedRate.overrided = true
      this.selectedRate.dailyPrices.forEach((dp) => {
        dp.price = pricePerNight
      })
      // aggiorno il totale della prenotazione
      this.selectedRate.total = parseFloat(this.newPrice)
      // invio l'evento al server
      this.$socket.emit('new-rate-price', {
        hotel: this.currentSession.hotel,
        sessionid: this.currentSession.sessionid,
        room: this.currentRoom,
        rate: this.selectedRate,
        newPrice: this.newPrice
      })
    },
    getSessioNewMessages (session) {
      if (session.chat) {
        return session.chat.filter((message) => {
          return message.new === true
        }).length
      }
    }
  },
  watch: {
    chatActive: function () {
      this.saveSettings()
    }
  },
  computed: {
    ...mapGetters([
      'sessions',
      'currentSession'
    ]),
    chatActive: {
      get () {
        return this.$store.state.settings.settings.chat.active
      },
      set (value) {
        this.$store.commit('setChatData', {
          field: 'active',
          value: value
        })
      }
    },
    adultsCount () {
      return this.currentSession.filters.rooms.reduce((prev, curr) => {
        return parseInt(prev) + parseInt(curr.adults)
      }, 0)
    },
    childsCount () {
      return this.currentSession.filters.rooms.reduce((prev, curr) => {
        return parseInt(prev) + parseInt(curr.childs)
      }, 0)
    }
  }
}
</script>
