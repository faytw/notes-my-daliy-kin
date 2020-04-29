<template>
  <v-row justify="center">
    <v-col>
       <v-textarea
        v-for="column in notesColumnsTitle" 
        :key="column.kin" 
        outlined 
        :label="column.title"
        :hint="column.hint"
        rows="3"
        counter="50" 
        @input="(value) => addNewNotes(value, column.kin)"
      />
    </v-col>
  </v-row>

</template>

<script>
import { initData } from '../helpers/moonCalender'

export default {
  name: 'notes',
  data: () => ({
    initData: initData || [],
    notes: [],
    notesColumnsTitle: [],
  }),
  mounted() {
    this.getNotesColumnsTitle()
  },
  methods: {
    getNotesColumnsTitle() {
      const [top, left, middle, right, bottom] = this.initData
      const columnsOrder = [middle, left, right, top, bottom]
      
      this.notesColumnsTitle = columnsOrder.map(({
        sealText,
        toneText,
        position,
        positionText,
        kin
      }) => {
        return {
          title: `${this.$t(`positionText.${positionText}`)}-${this.$t(`toneText.${toneText}`)}${this.$t(`sealText.${sealText}`)}`,
          position,
          kin
        }
      })
      this.notes = columnsOrder.map(({
        kin
      }) => {
        return {
          kin
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
        note: {
          value: input,
          date: new Date().toUTCString() //UTC(+0)
        }
      }
    },
  }
}
</script>