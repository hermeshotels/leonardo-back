<template>
<div class="erm-session-chat-wrapper">
  <div class="erm-chat-messages">
    <div class="erm-chat-message-wrapper" ref="chatMessages" v-for="message in session.chat" :class="{front: message.from === 'front', back: message.from === 'back'}">
      <span class="erm-chat-message" v-html="message.message"></span>
    </div>
  </div>
  <div class="erm-chat-bar">
    <mu-flexbox align="center">
      <mu-flexbox-item :grow="6">
        <mu-text-field
        class="erm-chat-input"
        v-model="message"
        :multi-line="true"
        hintText="Il tuo messaggio" />
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-icon-button icon="send" @click="send" />
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      message: ''
    }
  },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations([
      'newMessage'
    ]),
    send () {
      let data = {
        hotel: this.session.hotel,
        sessionid: this.session.sessionid,
        from: 'back',
        new: true,
        message: this.message
      }
      this.newMessage(data)
      this.$socket.emit('new-chat-message', data)
      this.message = ''
      setTimeout(() => {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight
      }, 10)
    }
  }
}
</script>
<style lang="scss">
.erm-session-chat-wrapper{
  height: 100%;
  position: relative;
  .erm-chat-input{
    width: 100%;
    padding-top: 10px;
    min-height: auto;
  }
  .erm-chat-messages{
    padding-bottom: 60px;
    padding: 2em;
    height: 100%;
    .erm-chat-message-wrapper{
      display: flex;
      &.front{
        justify-content: flex-start;
        .erm-chat-message{
          background: #FFF;
        }
      }
      &.back{
        justify-content: flex-end;
        .erm-chat-message{
          background: #3395E8;
          color: #FFF;
        }
      }
      .erm-chat-message{
        max-width: 90%;
        padding: 6px 13px 7px;
        cursor: default;
        overflow: hidden;
        display: block;
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        hyphens: auto;
        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        -ms-border-radius: 16px;
        -o-border-radius: 16px;
        border-radius: 16px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        margin-bottom: 20px;
      }
    }
  }
  .erm-chat-bar{
    min-height: 60px;
    width: 100%;
    border-top: 1px solid #dedede;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #FFF;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
