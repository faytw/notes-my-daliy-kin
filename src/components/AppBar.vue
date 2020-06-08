<template>
  <v-app-bar app color="#FFAB00" dark>
    <div class="d-flex align-center">
      <v-btn to="/home" text link><span>{{ $t(`common.project`) }}</span></v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="navbar-without-auth" v-if="!isLogin">
      <v-btn text link to="/signin" v-if="!isPageSignIn">
        <span class="mr-2">
          {{ $t(`common.signIn`) }}
        </span>
      </v-btn>
    </div>
    <div class="navbar-with-auth" v-else>
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
