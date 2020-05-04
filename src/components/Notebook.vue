<template>
  <v-row justify="center">
    <v-col>
      <div class="text-center">KIN {{ this.displayKin }}</div>
      <v-card
        class="infos mb-20"
        v-for="(info, index) in infoData"
        :key="index"
      >
        <v-card-text>
          <div>{{ changeDateFormat(info.date) }}</div>
          <div>{{ info.note }}</div>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'notebook',
  data: () => ({
    infoData: [],
  }),
  computed: {
    ...mapState('notes', {
      notes: 'infos'
    }),
    ...mapState('signature', {
      displayKin: 'displayKin'
    }),
  },
  mounted() {
    this.getNotes()
  },
  watch: {
    displayKin() {
      this.setInfoData()
    },
  },
  methods: {
    ...mapActions('notes', {
      getNotes: 'GET_NOTES',
      createNotes: 'CREATE_NOTES',
    }),
    changeDateFormat(date) {
      const options = {
        hour12: false
      }
      const d = new Date(date).toLocaleString('zh-TW', options)
      return d.split(' ')[0].replace('/', '-').replace('/', '-')
    },
    setInfoData(){
      const temp = this.notes.slice()
      const data = temp.reduce((acc, next) => {
        acc[next.kin] = acc[next.kin] || []
        acc[next.kin].push(next)
        return acc
      }, {})
      const dataKey = Object.keys(data).filter((key) => Number(key) === this.displayKin)
      this.infoData = data[dataKey]
    }
  },
}
</script>
<style scoped>
.infos {
  margin-bottom: 20px;
}
</style>