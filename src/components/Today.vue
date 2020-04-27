<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <div>{{ displayTodayFormat }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-bottom-navigation
          v-model="pageNav"
          dark
        >
          <v-btn value="notes" @click="handleNotesDialog('open')">
            <span v-t="`nav.notes`"></span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
          <v-btn value="notebook">
            <span v-t="`nav.notebook`"></span>
            <v-icon>mdi-notebook</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="noteDialog" persistent max-width="60%">
        <v-card>
          <v-card-title class="headline">新增事件筆記</v-card-title>
          <v-card-text>
            <v-textarea
              v-for="column in notesColumnsTitle"
              :key="column.kin"
              outlined
              :label="column.title"
              rows="3"
              :hint="column.hint"
              counter="50"
              @input="(value) => addNewNotes(value, column.kin)"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="handleNotesDialog('close')">
              <span>Cancel</span>
            </v-btn>
            <v-btn color="blue darken-1" text @click="handleNotesDialog('close')">
              <span>Save</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-col 
        class='mc-container col-md-6 col-sm-6 text-center'
        cols="10">
        <div 
          class="square" 
          v-for='(item, index) in displayData' 
          :key='index' 
          :data-mc='item.position'
          :data-bgColor='item.color'
          :data-now='item.positionNow'
        >
          <div class="text-center" v-if='item.toneText'>{{ $t(`toneText.${item.toneText}`) }}</div>
          <div class="text-center" v-if='item.iconText'>{{ $t(`iconText.${item.iconText}`) }}</div>
          <div class="text-center" v-if="item.kin">KIN {{ item.kin }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { 
  dateNow, 
  initData ,
} from '../helpers/moonCalender'

export default {
  name: 'today',
  data: () => ({
    dateNow: dateNow || {},
    initData: initData || [],
    displayData: [],
    displayTodayFormat: '',
    pageNav: 'notes',
    noteDialog: false,
    notes: [],
    notesColumnsTitle: [],
  }),
  mounted() {
    this.setPositionNowProp()
    this.setDisplayTodayFormat()
  },
  methods: {
    getNotesColumnsTitle() {
      const columnOrder = ['middle', 'right', 'left', 'top', 'bottom']
      const columns = this.initData.slice()
      const columnsTitleText = columns.map(({ iconText, toneText, position, positionText, kin }) => {
        return {
          title: `${this.$t(`positionText.${positionText}`)}-${this.$t(`toneText.${toneText}`)}${this.$t(`iconText.${iconText}`)}`,
          position, 
          kin
        }
      })
      this.notes = columns.map(({kin}) => {
        return {kin}
      })
      for (let i=0; i<columnOrder.length; i++) {
        this.notesColumnsTitle[i] = columnsTitleText.filter(({position}) => position === columnOrder[i])[0]
      }
    },
    handleNotesDialog(status = 'open' ) {
      this.noteDialog = status === 'open'
      if (this.noteDialog) this.getNotesColumnsTitle()
    },
    addNewNotes(input, kin) {
      let notesIndex = 0
      this.notes.forEach((note, index) => {
        if(note.kin === kin) notesIndex = index
      })
      this.notes[notesIndex] = {
        ...this.notes[notesIndex],
        note: {
          value: input,
          date: new Date().toUTCString()//UTC(+0)
        }
      }
    },
    setDisplayTodayFormat() {
      const { year, month, date } = this.dateNow
      this.displayTodayFormat =  `${year}-${month < 10 ? '0' + month : month}-${date}`
    },
    setPositionNowProp(){
      const { hours } = this.dateNow
      const temp = this.initData.slice()
      this.displayData = temp.map((data) => {
        data = {
          ...data,
          positionNow : data.position === 'middle' ? false : data.positionTimeZone.includes(Number(hours)) 
        }
        return data
      })
    }
  }
}
</script>

<style scoped>
  .square[data-mc] {      
    font-size: 12px;
    width: 31.5%;
    display: inline-flex;
    margin: 5px 3px;
    padding: 3px 5px;
    font-weight: 700;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 99em;
    width: 90px;
    height: 90px;
  }
  .square[data-mc='top'] {
    display: flex;
    margin: 0 auto;
    margin-bottom: 5px;
    justify-content: center
  }
  .square[data-mc='bottom'] {
    display: flex;
    margin: 0 auto;
    margin-top: 5px
  }
  .square[data-bgColor='red'] {
    background-color: #f92f2f;
  }
  .square[data-bgColor='yellow'] {
    background-color: #f6f940;
  }
  .square[data-bgColor='blue'] {
    background-color: #5252ea;
  }
  .square[data-bgColor='white'] {
    background-color: #fbfafa;
  }
  .square[data-now='true'] {
    box-shadow: 3px 3px 8px #3c4444;
  }
  .display-time {
    font-size: 0.375em;
  }
</style>