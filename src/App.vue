<template>
  <v-app class="app-container">
    <app-bar class="app-bar-container"/>
    <notification :active="active" :configs="configs"></notification>
    <v-content>
     <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import Notification from './components/Notification.vue'
import { mapState } from 'vuex'


export default {
  name: 'App',
  components: {
    AppBar,
    Notification
  },
  computed: {
    ...mapState('notification', [
      'configs',
      'active',
    ]),
  }
};
</script>

<style>
body {
  background-color: #000;
}
.app-container, 
.app-bar-container, 
.content-container,
.app-bar-container > .v-toolbar__content {
  max-width: 960px;
  margin: 0px auto;
}
</style>