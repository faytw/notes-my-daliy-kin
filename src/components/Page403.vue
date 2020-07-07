<template>
  <v-col class="col-lg-6 col-md-6 mr-auto ml-auto text-center ">
    <div class="mt-5 mb-5">帳號權限不足。</div>
    <v-btn text color="success" class="mr-3" outlined to="/index">回首頁</v-btn>
    <v-btn text color="primary" outlined @click="signOut">重新登入</v-btn>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'page403',
  methods: {
    ...mapActions('user', {
      clearUserInfos: 'CLEAR_USER_INFOS',
    }),
    signOut() {
      this.clearUserInfos()
      this.$router.push('signin')
    },
  }
}
</script>
