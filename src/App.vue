<template>
  <v-app>
    <app-bar/>
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
