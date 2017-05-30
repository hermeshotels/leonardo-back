<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  overflow: hidden;
}
*, *::after, *::before {
  box-sizing: inherit!important;
}
#app{
  height: 100%;
  background: #f1f1f1;
  overflow: hidden;
  *, *::after, *::before {
    box-sizing: border-box!important;
  }
}
#header{
  display: none;
}
#footer{
  display: none;
}
#container{
  min-width: 100%;
  padding: 0;
  height: 100%;
}
#content{
  height: 100%;
  margin-top: 0;
  padding-left: 0;
  min-width: 100%;
  float: none;
  clear: inherit;
}
.full-height{
  height: 100%;
}
</style>
