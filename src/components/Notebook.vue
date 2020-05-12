<template>
  <v-row justify="center">
    <v-col>
      <div class="text-center">{{ board.name }}</div>
      <div class="text-center caption">{{ board.question }}</div>
      <div class="text-center caption font-italic">{{ board.body }}</div>
      <v-spacer></v-spacer>
      <v-card
        class="infos"
        v-for="(info, index) in infoData"
        :key="index"
      >
        <v-card-text>
          <div class="font-italic text-right">{{ info.created_time ? changeDateFormat(info.created_time) : ''}}</div>
          <div>{{ info.note }}</div>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import { 
  handleNotebookData,
} from '../helpers/moonCalender'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'notebook',
  data: () => ({
    infoData: [],
    board: {},
  }),
  computed: {
    ...mapState('notes', {
      notes: 'infos'
    }),
    ...mapState('signature', {
      displayKin: 'displayKin',
    }),
    ...mapState('user', [
      'email'
    ])
  },
  watch: {
    displayKin(val) {
      const { sealText, toneText } = handleNotebookData(val)
      this.board = { ...this.board, 
        name: `${this.$t(`toneText.${toneText}`)}${this.$t(`sealText.${sealText}`)}`,
        question: this.$t(`toneQuestion.${toneText}`),
        body: `${this.$t(`toneBody.${toneText}`)}&${this.$t(`sealBody.${sealText}`)}`
      }
      const params = {
        sealText
      }
      this.getNotes(params)
    },
    notes(val) {
      this.setInfoData(val)
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
      const d = new Date(date.seconds * 1000).toLocaleString('zh-TW', options)
      return d.split(' ')[0]
    },
    setInfoData(val) {
      const data = val[this.displayKin]
      this.infoData = data && Object.entries(data).length > 0 ? data : []
    }
  },
}
</script>
<style scoped>
.infos {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>