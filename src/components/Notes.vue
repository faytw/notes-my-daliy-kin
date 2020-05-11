<template>
  <v-row justify="center" >
    <v-col cols="12">
       <v-textarea
        v-for="column in notesColumnsTitle" 
        :key="column.kin" 
        outlined 
        :label="column.title"
        :hint="column.hint"
        rows="2"
        counter="50" 
        @input="(value) => addNewNotes(value, column.kin)"
      />
    </v-col>
    <v-col align="end">
      <v-btn @click="saveNotes" color="success" outlined>SAVE</v-btn>
    </v-col>
  </v-row>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'notes',
  data: () => ({
    notes: [],
    notesColumnsTitle: [],
  }),
  computed: {
    ...mapState('signature', [
      'infos',
    ])
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
      }) => {
        return {
          kin,
          sealText
        }
      })
    },
    addNewNotes(input, kin) {
      let notesIndex = 0
      this.notes.forEach((note, index) => {
        if (note.kin === kin) notesIndex = index
      })
      this.notes[notesIndex] = {
        ...this.notes[notesIndex],
        note: input,
        date: new Date().toUTCString() //UTC(+0)
      }
    },
    saveNotes() {
      let data = []
      this.notes.forEach((note) => {
        if (note.hasOwnProperty('note')) {
          data.push(note)
        }
      })
      const all = []
      data.forEach(({sealText, kin, note, date}) => {
        const params = {
          sealText,
          kin,
          data: {
            note,
            date,
          },
        }
        all.push(params)
      })
      this.createNotes(all)
    },
  }
}
</script>