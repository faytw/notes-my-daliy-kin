<template>
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
        <div class="text-center" v-if='item.sealText'>{{ $t(`sealText.${item.sealText}`) }}</div>
        <div class="text-center" v-if="item.kin">KIN {{ item.kin }}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { 
  dateNow, 
  initData ,
} from '../helpers/moonCalender'

export default {
  name: 'signature',
  data: () => ({
    dateNow: dateNow || {},
    initData: initData || [],
    displayData: [],
  }),
  mounted() {
    this.setPositionNowProp()
  },
  methods: {
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