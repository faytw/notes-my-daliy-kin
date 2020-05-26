<template>
  <div>
    <v-btn href="/relationships/computer">新增星盤</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'relationshipList',
  computed: {
    ...mapState('user', [
      'email'
    ]),
    ...mapState('logs', [
      'infos'
    ]),
  },
  created() {
    this.getLogs({user: this.email})
  },
  methods: {
    ...mapActions('logs', {
      getLogs: 'GET_USER_LOGS',
    }),
  },
}
</script>
