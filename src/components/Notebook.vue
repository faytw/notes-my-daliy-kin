<template>
  <v-row justify="center">
    <v-col>
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
    displayKin: '31',
  }),
  computed: {
    ...mapState('notes', [
      'infos'
    ]),
  },
  mounted() {
    this.getNotes()
  },
  watch: {
    infos() {
      this.setInfoData()
    }
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
      const temp = this.infos.slice()
      const data = temp.reduce((acc, next) => {
        acc[next.kin] = acc[next.kin] || []
        acc[next.kin].push(next)
        return acc
      }, {})
      const dataKey = Object.keys(data).filter((key) => key === this.displayKin)[0]
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