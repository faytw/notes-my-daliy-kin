<template>
  <v-app>
    <v-app-bar
      app
      color="#FFAB00"
      dark
    >
      <div class="d-flex align-center">
       <v-btn href="/" text><span>Moons Calender</span></v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="#"
        target="_blank"
        text
      >
        <span class="mr-2">Sign In</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
