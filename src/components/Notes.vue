<template>
  <v-row justify="center" >
    <v-col cols="12">
       <v-textarea
        v-for="(column, index) in notesColumnsTitle" 
        :key="index" 
        outlined 
        :label="column.title"
        :hint="column.hint"
        rows="2"
        counter="50" 
        @input="(value) => addNewNotes(value, column.kin, column.position)"
      />
    </v-col>
    <v-col align="end">
      <v-btn @click="saveNotes" color="success" outlined>SAVE</v-btn>
    </v-col>
  </v-row>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import uuid from '../helpers/uuid' 

export default {
  name: 'notes',
  data: () => ({
    notes: [],
    notesColumnsTitle: [],
  }),
  computed: {
    ...mapState('signature', [
      'infos',
    ]),
    ...mapState('user', [
      'id'
    ])
  },
  mounted() {
    this.getNotesColumnsTitle(this.infos)
  },
  watch: {
    infos(val) {
      this.getNotesColumnsTitle(val)
    }
  },
  methods: {
    ...mapActions('notes', {
      createNotes: 'CREATE_NOTES'
    }),
    getNotesColumnsTitle(val) {
      const [top, left, middle, right, bottom] = val
      const columnsOrder = [middle, right, top, left, bottom]

      this.notesColumnsTitle = columnsOrder.map(({
        sealText,
        toneText,
        position,
        positionText,
        kin
      }) => {
        let posText = `${this.$t(`positionText.${positionText}`)}`
        let tText = `${this.$t(`toneText.${toneText}`)}`
        let sText = `${this.$t(`sealText.${sealText}`)}`
        let timeText = `${this.$t(`positionTimeAreaText.${positionText}`)}`
        let titleFormat = `${posText}-${tText}${sText}(${timeText})`
        return {
          title: titleFormat,
          position,
          kin,
          sealText,
        }
      })
      this.notes = columnsOrder.map(({
        kin,
        sealText,
        position,
      }) => {
        return {
          kin,
          sealText,
          position,
        }
      })
    },
    addNewNotes(input, kin, position) {
      let notesIndex = -1
      this.notes.forEach((note, index) => {
        if (note.position === position) {
          notesIndex = index
        }
      })
      this.notes[notesIndex] = {
        ...this.notes[notesIndex],
        note: input,
        createdTime: new Date()
      }
    },
    saveNotes() {
      const temp = []
      const all = []
      this.notes.forEach((note) => {
        if (note.hasOwnProperty('note')) {
          temp.push(note)
        }
      })
      temp.forEach(({sealText, kin, note, createdTime}) => {
        let params
        if(note) {
          params = {
            kin,
            data: {
              seal_text: sealText,
              note,
              created_time: createdTime,
              author: this.id,
              note_id: uuid.set()
            },
          }
          all.push(params)
        }
      })
      this.createNotes(all)
    },
  }
}
</script>
