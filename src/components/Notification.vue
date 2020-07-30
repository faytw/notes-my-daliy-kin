<template>
  <v-snackbar
    data-cy="Content-Notify-Container"
    v-model="snackbar"
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
      data-cy="Content-Notify-Button-Confirm"
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
import { mapActions } from 'vuex'

export default {
  name: 'notification',
  data() {
    return {
      snackbar: null
    }
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    configs: {
      type: Object,
      required: true
    }
  },
  watch: {
    active(val) {
      this.snackbar = val
    },
    snackbar(val) {
      if(!val) {
        this.setNotifyStatus(false)
      }
    }
  },
  methods: {
    ...mapActions('notification',{
      setNotifyStatus: 'SET_NOTIFY_STATUS',
    }),
    close() {
      this.setNotifyStatus(false)
    },
  },
}
</script>
