<template>
  <v-app-bar app color="#FFAB00" dark>
    <div class="d-flex align-center">
      <v-btn href="/" text><span>{{ $t(`common.project`) }}</span></v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="navbar-with-auth" v-if="!isVisitor">
      <v-icon>mdi-account-circle</v-icon>
      <span class="ml-2">有權限</span>
    </div>
    <div class="navbar-without-auth" v-else>
      <v-btn href="/signin" text v-if="!isPageSignIn">
        <span class="mr-2">
          {{ $t(`common.signIn`) }}
        </span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import {
  // mapActions,
  mapState
} from 'vuex'

export default {
  name: 'appBar',
  computed: {
    ...mapState('user', [
      'role',
      'name', 
    ]),
    isVisitor(){
      return this.role === 'visitor'
    },
    isPageSignIn() {
      return this.$route.name === 'signIn'
    }
  },
};
</script>
