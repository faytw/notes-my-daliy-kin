<template>
  <v-app-bar app color="#FFAB00" dark
    data-cy="Content-App-Top-Bar"
  >
    <div class="d-flex align-center">
      <v-btn to="/index" text link 
        data-cy="Content-App-Link-Title"
      >
        <span>{{ $t(`common.project`) }}</span>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="navbar-without-auth" v-if="!isLogin">
      <v-btn text link to="/signin" v-if="!isPageSignIn">
        <span class="mr-2">
          {{ $t(`common.signIn`) }}
        </span>
      </v-btn>
    </div>
    <div v-else
      class="navbar-with-auth"         
      data-cy="Content-App-User-Info-Name"
    >
      <v-icon>mdi-account-circle</v-icon>
      <span class="ml-2">{{ name }}</span>
    </div>
  </v-app-bar>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'appBar',
  computed: {
    ...mapState('user', [
      'roles',
      'name',
    ]),
    isLogin(){
      return this.roles.length > 0
    },
    isPageSignIn() {
      return this.$route.name === 'signIn'
    }
  },
};
</script>
