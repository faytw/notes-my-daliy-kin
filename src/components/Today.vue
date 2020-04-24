<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <div>{{ `${dateNow.year} / ${dateNow.month} / ${dateNow.date}` }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-bottom-navigation
          v-model="bottomNav"
          dark
        >
          <v-btn value="notes" @click="dialog=true">
            <span>Notes</span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
          <v-btn value="notes">
            <span>Notebook</span>
            <v-icon>mdi-notebook</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">新增事件筆記</v-card-title>
          <v-card-text>
            <v-textarea
              outlined
              :label="`主印記-${ $t(`iconText.${initData.middle.iconText}`)}`"
            />
            <v-textarea
              outlined
              :label="`支持-${ $t(`iconText.${initData.right.iconText}`)}`"
            />
            <v-textarea
              outlined
              :label="`引導-${ $t(`iconText.${initData.top.iconText}`)}`"
            />
            <v-textarea
              outlined
              :label="`挑戰-${ $t(`iconText.${initData.left.iconText}`)}`"
            />
            <v-textarea
              outlined
              :label="`隱藏推動-${ $t(`iconText.${initData.bottom.iconText}`)}`"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              <span>Cancel</span>
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
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
          v-for='(item, index) in initData' 
          :key='index' 
          :data-mc='item.position'
          :data-now='item.now'
          :data-bgColor='item.color'
        >
          <div class="text-center" v-if='item.toneText'>{{ $t(`tone.${item.toneText}`) }}</div>
          <div class="text-center" v-if='item.iconText'>{{ $t(`iconText.${item.iconText}`) }}</div>
          <div class="text-center" v-if="item.kin">KIN {{ item.kin }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dateNow, initData } from '../helpers/moonCalender'

export default {
  name: 'today',
  data: () => ({
    dateNow,
    initData,
    bottomNav: 'note',
    dialog: false
  }),
  methods: {
    addNote() {
      console.log('ADD NOTE')
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
  .square[data-now] {
    box-shadow: 3px 3px 8px #a5a8a8;
  }
  .display-time {
    font-size: 0.375em;
  }
</style>