<template>
  <v-row justify="center">
    <v-col>
      <div class="text-center">
        <span>{{ board.name }}</span>
        <v-icon v-show="board.isGreenGrid" color="green">mdi-judaism</v-icon>
      </div>
      <div class="text-center caption">{{ board.question }}</div>
      <div class="text-center caption font-italic">{{ board.body }}</div>
      <v-spacer></v-spacer>
      <v-card
        class="infos"
        v-for="(info, index) in infoData"
        :key="index"
      >
        <v-card-text>
          <div class="text-right">{{ info.createdTime }}</div>
          <ul>
            <li 
              class="infos-content"
              v-for="(note, index) in info.notes"
              :key="index"
            >
            {{ note.val }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import { 
  handleKinData,
  isGreenGrid,
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
  },
  mounted() {
    this.setInfoData(this.notes)
    const { sealText, toneText } = handleKinData(this.displayKin)
    this.board = { ...this.board, 
      name: `${this.$t(`toneText.${toneText}`)}${this.$t(`sealText.${sealText}`)}`,
      question: this.$t(`toneQuestion.${toneText}`),
      body: `${this.$t(`toneBody.${toneText}`)} & ${this.$t(`sealBody.${sealText}`)}`,
      isGreenGrid: isGreenGrid(this.displayKin),
    }
  },
  watch: {
    displayKin(val) {
      const { sealText, toneText } = handleKinData(val)
      this.board = { ...this.board, 
        name: `${this.$t(`toneText.${toneText}`)}${this.$t(`sealText.${sealText}`)}`,
        question: this.$t(`toneQuestion.${toneText}`),
        body: `${this.$t(`toneBody.${toneText}`)} & ${this.$t(`sealBody.${sealText}`)}`,
        isGreenGrid: isGreenGrid(val),
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
      if (date && date.seconds) {
        const d = new Date(date.seconds * 1000).toLocaleString('zh-TW', options)
        return d.split(' ')[0]
      } else {
        throw new Error('Failed, "created_time" must be exist.')
      }
    },
    setInfoData(val) {
      const data = val[this.displayKin]
      if (data && Object.entries(data).length > 0) {
        const infos = data.slice()
        let tempArr = []
        infos.forEach((elm) => {
          elm.createdTime = this.changeDateFormat(elm.created_time)
          tempArr.push(elm)
        })
        const result = tempArr.reduce((acc, info) => {
          const itemIndex = acc.findIndex(accVal => accVal.createdTime === info.createdTime)
          if (itemIndex >= 0) {
            acc[itemIndex].notes.push({ val:info.note, id:info.note_id })
          } else {
            acc.push({
              notes: [{ val:info.note, id:info.note_id }],
              createdTime: info.createdTime,
              author: info.author,
            })
          }
          return acc
        }, [])
        this.infoData = result
      } else {
        this.infoData = []
      }  
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