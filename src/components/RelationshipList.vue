<template>
  <div>
    <div class="text-center">
      <v-btn link text to="/relationships/computer-saved" color="primary">
        新增星盤紀錄
      </v-btn>
    </div>
    <v-data-table 
      v-if="showRelationshipsLogs"
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
import auth from '../helpers/auth'

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
    showRelationshipsLogs() {
      return auth.DISPLAY.showRelationshipsLogs.includes(this.roles[0])
    }
  },
  mounted() {
    if (this.showRelationshipsLogs) {
      this.getLogs({ user: this.id })
    }
  },
  methods: {
    ...mapActions('logs', {
      getLogs: 'GET_USER_LOGS',
    }),
  },
}
</script>
