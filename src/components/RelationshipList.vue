<template>
  <div>
    <div class="text-center">
      <!-- <v-btn link text to="/relationships/computer-saved" color="primary" @click="preparing"> -->
      <v-btn link text color="primary" @click="preparing">
        新增星盤紀錄
      </v-btn>
    </div>
    <v-data-table 
      :headers="headers"
      :items="dataTableItems"
      :hide-default-footer="true"
      :disable-sort="true"
    >
      <template v-slot:item.name="{item}">
        <v-btn text :href="`/relationships/detail?id=${item.id}`">{{ item.name }}</v-btn>
      </template>
      <template v-slot:item.middle="{item}">
        <span>{{ $t(`toneText.${item.middle.toneText}`) }}</span>
        <span>{{ $t(`sealText.${item.middle.sealText}`) }}</span>
        <span>(KIN{{ item.middle.kin }})</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'

export default {
  name: 'relationshipList',
  data: () => ({
    headers: [
      { text: '名稱', value: 'name' },
      { text: '馬雅主印記', value: 'middle' },
    ],
  }),
  computed: {
    ...mapState('user', [
      'id',
      'roles'
    ]),
    ...mapState('logs', [
      'infos', 'dataTableItems'
    ]),
  },
  // mounted() {
  //   console.log(this.id)
  //   this.getLogs({ user: this.id })
  // },
  watch: {
    id(val) {
      this.getLogs({ user: val })
    }
  },
  methods: {
    ...mapActions('logs', {
      getLogs: 'GET_USER_LOGS',
    }),
    ...mapActions('notification', {
      setNotifyStatus: 'SET_NOTIFY_STATUS',
      setNotifyConfigs: 'SET_NOTIFY_CONFIGS',
    }),
    showNotify() {
      const configs = {
        type: 'error', 
        message: 'permission.notYet',
      }
      this.setNotifyStatus('visible')
      this.setNotifyConfigs(configs)
    },
    preparing() {
      this.showNotify()
    }
  },
}
</script>
