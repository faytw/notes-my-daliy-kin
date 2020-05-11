<template>
  <v-app>
    <v-app-bar
      app
      color="#FFAB00"
      dark
    >
      <div class="d-flex align-center">
       <v-btn href="/" text><span>{{ $t(`common.project`) }}</span></v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        target="_blank"
        text
      >
        <span class="mr-2">{{ $t(`common.signIn`) }}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home
  },
  data: () => ({
    //
  }),
};
</script>
