<template>
<div class="erm-settings-wrapper">
  <mu-flexbox align="center" justify="center" orient="horizontal">
    <mu-flexbox-item>
      <div class="erm-settings-header erm-settings-page">
        <h2>Impostazioni Booking Engine</h2>
        <p>
        Tramite questo pannello potrai personalizzare tutti i valori relativi al booking engine. Potrai inoltre accedere
        alle impostazioni di tracciamento e analisi relative a Google Analytics.
        </p>
      </div>

      <div class="erm-settings-page erm-language-settings">
        <p>Alcune impostazioni possono variare in base alla linga, prima di procedere alle modifiche scegli la lingua.</p>
        <mu-select-field v-model="currentLang" label="Lingua corrente" helpText="Scegli la modalità di applicazione">
          <mu-menu-item v-for="lang in settingsLanguages" :value="lang.toLowerCase()" :title="lang" :key="lang"/>
        </mu-select-field>
      </div>

      <div class="erm-settings-page">
        <mu-linear-progress v-if="loadingData" />
        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'general'">
            <h3>Impostazioni Generali</h3>
            <p>
            Gestisci le impostazioni generali del Booking Engine, titolo introduttivo.
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'general'">
            <mu-flexbox>
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Titoli</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
                <mu-text-field
                  v-model="subTitle"
                  hintText="Secure Direct Official Booking"
                  helpText="Il sottotitolo viene mostrato subito sotto il nome della struttura"/>
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>

        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'graphic'">
            <h3>Aspetto grafico</h3>
            <p>
            Gestisci le impostazioni grafiche relative al Booking Engine ( colore primario, colore secondario )
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'graphic'">
            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Colori</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
                <mu-text-field
                  v-model="primaryColor"
                  hintText="#365732"
                  helpText="Colore primario"/>
                  <mu-text-field
                  v-model="secondaryColor"
                  hintText="#365732"
                  helpText="Colore secondario"/>
              </mu-flexbox-item>
            </mu-flexbox>

            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1">
                <strong>Elementi</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-checkbox label="Nascondi logo" v-model="hideLogo"/><br/>
               <mu-checkbox label="Nascondi nome struttura" v-model="hideName"/><br/>
               <mu-checkbox label="Nascondi Promocode" v-model="hidePromo"/><br/>
              </mu-flexbox-item>
            </mu-flexbox>

            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Immagini</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
                <mu-text-field
                  v-model="logoUrl"
                  hintText="Url immagine"
                  helpText="Logo del gruppo"/>
                  <mu-text-field
                  v-model="bannerUrl"
                  hintText="Url immagine"
                  helpText="Banner del gruppo"/>
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>

        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'payment'">
            <h3>Pagamento</h3>
            <p>
            Gestici i metodi di pagamento attivi sul BOL ed imposta le relative informazioni ( Carte accettate, Bonfico bancario)
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'payment'">
            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Metodi di pagamento</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-checkbox label="Carta di Credito" :disabled="true" v-model="creditCard" /><br/>
               <mu-checkbox label="Bonifico Bancario" v-model="bankTransfer" />
              </mu-flexbox-item>
            </mu-flexbox>

            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Dati bancari</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-text-field
                  v-model="dayBefore"
                  :disabled="!bankTransfer"
                  hintText="Giorni di anticipo"
                  helpText="Numero di giorni entro i quali il cliente deve effettuare il bonifico"/><br>
                <mu-text-field
                  v-model="transferBefore"
                  :disabled="!bankTransfer"
                  hintText="Finestra bonifico"
                  helpText="Il metodo di pagamento viene mostrato solo se l'arrivo è maggiore della finestra"/>
                <mu-text-field
                  v-model="iban"
                  :disabled="!bankTransfer"
                  hintText="IBAN"
                  helpText="Codice IBAN del conto corrente della struttura"/>
                <mu-text-field
                  v-model="bankName"
                  :disabled="!bankTransfer"
                  hintText="Nome Banca"
                  helpText="Nome della Banca dove risiede il conto"/>
                <mu-text-field
                  v-model="ownerName"
                  :disabled="!bankTransfer"
                  hintText="Intestatario"
                  helpText="Nome o Ragione Sociale dell'intestatario del conto"/>
                <mu-text-field
                  v-model="abiCode"
                  :disabled="!bankTransfer"
                  hintText="ABI"
                  helpText="Codice ABI del conto corrente"/>
                <mu-text-field
                  v-model="cabCode"
                  :disabled="!bankTransfer"
                  hintText="CAB"
                  helpText="Codice CAB del conto corrente"/>
                <mu-text-field
                  v-model="swiftCode"
                  :disabled="!bankTransfer"
                  hintText="SWIFT"
                  helpText="Codice SWIFT"/>
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>

        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'scraper'">
            <h3>Comparatore</h3>
            <p>
            Gestici il comparatore di tariffe tra OTA e BOL imposta la stringa di ricerca e attiva il componente.
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'scraper'">
            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Scraper</strong>
                <p>I dati di scraping sono recuperati direttamente da Google.com e tenuti in cache
                per un massimo di 3h.</p>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-text-field
                  v-model="uri"
                  hintText="URI"
                  helpText="Stringa di ricerca Google (hotel+test+roma)"/>
                </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>

        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'scripts'">
            <h3>Scripts e Tracciamento</h3>
            <p>
            Impostazioni relative al tracciamento Google Analytics, inserisci qui il tuo codice UA
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'scripts'">
            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Google Analytics</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-text-field
                  v-model="UATrackingId"
                  hintText="Codice UA"
                  helpText="Il tuo codice Universal Analytics UA-XXXXXX-XX"/><br>
              </mu-flexbox-item>
            </mu-flexbox>
            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1" class="erm-settings-sub-title">
                <strong>Tracciatura</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-checkbox label="Ecommerce"/><br>
               <mu-checkbox label="Eventi"/>
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>

        <div class="erm-settings-page-sec">
          <div class="erm-settings-page-intro" @click="currentTab = 'chat'">
            <h3>Chat</h3>
            <p>
            Gestisci le impostazioni della chat, messaggi di benvenuto immagine profilo
            </p>
          </div>
          <div class="erm-settings-page-section" v-show="currentTab === 'chat'">

            <mu-flexbox align="flex-start" class="erm-settings-sub-section">
              <mu-flexbox-item grow="1">
                <strong>Elementi</strong>
              </mu-flexbox-item>
              <mu-flexbox-item grow="2">
               <mu-text-field
                  v-model="chatName"
                  hintText="Mr. Ermes"
                  helpText="Nome del supporto in chat visualizzato all'utente"/><br>
                <mu-text-field
                  v-model="chatMessage"
                  hintText="Ciao! Siamo qui per aiutarti!"
                  helpText="Messaggio di benvenuto chat"/><br><br>
                <mu-checkbox label="Attiva chat" v-model="chatActive" />
              </mu-flexbox-item>
            </mu-flexbox>
          </div>
        </div>
      </div>

      <div class="erm-section-button">
       <mu-raised-button label="Salva" @click="save" primary/><br>
       <p>Le impostazioni salvate saranno visibili al <strong>refresh della pagina</strong></p>
      </div>

      <mu-toast v-if="toast" :message="toastMessage" @close="hideToast"/>

    </mu-flexbox-item>
  </mu-flexbox>
</div>
</template>
<style lang="scss">
.erm-settings-wrapper{
  height: 100%;
  background: #f1f1f1;
  overflow: auto;
  .erm-section-button{
    max-width: 1000px;
    margin: 0 auto;
  }
  .erm-language-settings{
    padding: 20px;
  }
  .erm-settings-page{
    background: #FFF;
    box-shadow: 0 1px 6px rgba(0,0,0,0.2);
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 3px;
    margin-bottom: 30px;
    h2{
      margin: 0;
    }
    h3{
      margin: 0;
    }
    p{
      font-size: 16px;
    }
    .erm-settings-page-sec{
      .erm-settings-page-intro{
        padding: 15px;
        border-bottom: 1px solid #dedede;
        transition: background 0.5s ease-in-out;
        cursor: pointer;
        &:hover{
          background: #f5f5f5;
        }
        p{
          font-size: 15px;
          color: #818181;
        }
      }
      .erm-settings-page-section{
        background: #f1f1f1;
        border-bottom: 1px solid #dedede;
        padding: 15px;
        .mu-text-field{
          width: 80%;
        }
        .erm-settings-sub-section{
          margin-bottom: 20px;
          .erm-settings-sub-title{
            strong{
              font-size: 16px;
            }
            p{
              font-size: 14px;
              width: 80%;
            }
          }
        }
      }
    }
  }
  .erm-settings-header{
    background: #3367d6;
    color: #FFF;
    padding: 15px;
  }
}
</style>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      currentTab: '',
      toast: false,
      taostMessage: '',
      loadingData: true
    }
  },
  mounted () {
    this.getSettings().then(() => {
      this.loadingData = false
    }, () => {
      this.loadingData = false
    })
  },
  computed: {
    ...mapGetters([
      'settingsLanguages',
      'settings'
    ]),
    currentLang: {
      get () {
        return this.$store.state.settings.currentSettingsLang
      },
      set (value) {
        this.$store.commit('setCurrentSettingsLang', value)
      }
    },
    subTitle: {
      get () {
        return this.$store.state.settings.settings.general[this.$store.state.settings.currentSettingsLang].subTitle
      },
      set (value) {
        this.$store.commit('setGeneralData', {
          field: 'subTitle',
          value: value
        })
      }
    },
    chatName: {
      get () {
        return this.$store.state.settings.settings.general[this.$store.state.settings.currentSettingsLang].chatName
      },
      set (value) {
        this.$store.commit('setGeneralData', {
          field: 'chatName',
          value: value
        })
      }
    },
    chatMessage: {
      get () {
        return this.$store.state.settings.settings.general[this.$store.state.settings.currentSettingsLang].chatMessage
      },
      set (value) {
        this.$store.commit('setGeneralData', {
          field: 'chatMessage',
          value: value
        })
      }
    },
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
    UATrackingId: {
      get () {
        return this.$store.state.settings.settings.general[this.$store.state.settings.currentSettingsLang].UATrackingId
      },
      set (value) {
        this.$store.commit('setGeneralData', {
          field: 'UATrackingId',
          value: value
        })
      }
    },
    ecommerce: {
      get () {
        return this.$store.state.settings.settings.analytics.ecommerce
      },
      set (value) {
        this.$store.commit('setAnalyticsData', {
          field: 'ecommerce',
          value: value
        })
      }
    },
    events: {
      get () {
        return this.$store.state.settings.settings.analytics.events
      },
      set (value) {
        this.$store.commit('setAnalyticsData', {
          field: 'events',
          value: value
        })
      }
    },
    primaryColor: {
      get () {
        return this.$store.state.settings.settings.look.primaryColor
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'primaryColor',
          value: value
        })
      }
    },
    secondaryColor: {
      get () {
        return this.$store.state.settings.settings.look.secondaryColor
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'secondaryColor',
          value: value
        })
      }
    },
    bannerUrl: {
      get () {
        return this.$store.state.settings.settings.look.bannerUrl
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'bannerUrl',
          value: value
        })
      }
    },
    logoUrl: {
      get () {
        return this.$store.state.settings.settings.look.logoUrl
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'logoUrl',
          value: value
        })
      }
    },
    hideLogo: {
      get () {
        return this.$store.state.settings.settings.look.hideLogo
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'hideLogo',
          value: value
        })
      }
    },
    hideName: {
      get () {
        return this.$store.state.settings.settings.look.hideName
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'hideName',
          value: value
        })
      }
    },
    hidePromo: {
      get () {
        return this.$store.state.settings.settings.look.hidePromo
      },
      set (value) {
        this.$store.commit('setLookData', {
          field: 'hidePromo',
          value: value
        })
      }
    },
    uri: {
      get () {
        return this.$store.state.settings.settings.scraping.uri
      },
      set (value) {
        this.$store.commit('setScrapeData', {
          field: 'uri',
          value: value
        })
      }
    },
    creditCard: {
      get () {
        return this.$store.state.settings.settings.payment.creditCard
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'creditCard',
          value: value
        })
      }
    },
    bankTransfer: {
      get () {
        return this.$store.state.settings.settings.payment.bankTransfer
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'bankTransfer',
          value: value
        })
      }
    },
    dayBefore: {
      get () {
        return this.$store.state.settings.settings.payment.dayBefore
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'dayBefore',
          value: value
        })
      }
    },
    transferBefore: {
      get () {
        return this.$store.state.settings.settings.payment.transferBefore
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'transferBefore',
          value: value
        })
      }
    },
    iban: {
      get () {
        return this.$store.state.settings.settings.payment.iban
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'iban',
          value: value
        })
      }
    },
    bankName: {
      get () {
        return this.$store.state.settings.settings.payment.bankName
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'bankName',
          value: value
        })
      }
    },
    ownerName: {
      get () {
        return this.$store.state.settings.settings.payment.ownerName
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'ownerName',
          value: value
        })
      }
    },
    abiCode: {
      get () {
        return this.$store.state.settings.settings.payment.abiCode
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'abiCode',
          value: value
        })
      }
    },
    cabCode: {
      get () {
        return this.$store.state.settings.settings.payment.cabCode
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'cabCode',
          value: value
        })
      }
    },
    swiftCode: {
      get () {
        return this.$store.state.settings.settings.payment.swiftCode
      },
      set (value) {
        this.$store.commit('setPaymentData', {
          field: 'swiftCode',
          value: value
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'saveSettings',
      'getSettings'
    ]),
    save () {
      this.saveSettings().then(() => {
        console.log('success')
        this.showToast('Salvataggio riuscito')
      }, () => {
        console.log('fail')
        this.showToast('Errore nel salvataggio')
      })
    },
    showToast (message) {
      this.toastMessage = message
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  }
}
</script>
