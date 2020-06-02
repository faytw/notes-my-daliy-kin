<template>
  <v-app>
    <app-bar/>
    <v-content>
      <home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'
import AppBar from './components/AppBar.vue'

export default {
  name: 'App',
  components: {
    Home,
    AppBar,
  },
};
</script>
