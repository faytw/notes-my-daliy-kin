<template>
  <v-snackbar
    :value="status === 'visible'"
    :top="configs.positionY ==='top'"
    :left="configs.positionX ==='left'"
    :right="configs.positionX === 'right'"
    :bottom="configs.positionY ==='bottom'"
    :timeout="configs.timeout"
    :vertical="configs.mode === 'vertical'"
    :multi-line="configs.mode === 'multiline'"
    :color="configs.customColor ? configs.customColor : configs.type"
  >
    {{ $t(`notify.${configs.message}`) }}
    <v-btn
      v-if="configs.showConfirmButton"
      color="primary"
      text
      @click="close"
    >
      {{ $t(`notify.${configs.confimButtonText}`) }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'notification',
  computed: {
    ...mapState('notification', [
      'configs',
      'status',
    ]),
  },
  methods: {
    ...mapActions('notification',{
      setNotifyStatus: 'SET_NOTIFY_STATUS',
    }),
    close() {
      const payload = 'hidden'
      this.setNotifyStatus(payload)
    },
  },
}
</script>
