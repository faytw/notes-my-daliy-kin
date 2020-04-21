<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <div>{{ `${today.year} / ${today.month} / ${today.date}` }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col 
        class='mc-container col-md-6 col-sm-6 text-center'
        cols="10">
        <div 
          class="square" 
          v-for='item in initData' 
          :key='item.location' 
          :data-mc='item.location'
          :data-now='item.now'
          :data-bgColor='item.color'
        >
          <div class="text-center" v-if='item.tone'>{{ $t(`tone.${item.tone}`) }}</div>
          <div class="text-center" v-if='item.text'>{{ $t(`iconText.${item.text}`) }}</div>
          <div class="text-center" v-if="item.kin">KIN {{ item.kin }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as config from '../helper/config.js'

export default {
  name: 'today',
  data: () => ({
    today: {
      year: 1911,
      month: 11,
      date: 11,
      mainKin: null,
      mainIcon: null,
      mainTone: null,
    },
    initData: [
      {location: 'top', icon:'hunabku'},
      {location: 'left', icon:'hunabku'},
      {location: 'middle', icon:'hunabku'},
      {location: 'right', icon:'hunabku'},
      {location: 'bottom', icon:'hunabku'},
    ],
    toneTable: config.toneTable,
    iconTable: config.iconTable,
    guideIconTable: config.guideIconTable,
    timeZones: config.timeZones,
    monthTable: config.monthTable,
    colorTable: config.colorTable,
  }),
  mounted(){
    this.setDate()
    this.setDataAt()
    this.calulateDateMainIcon()
    this.showIcons()
  },
  methods: {
    calulateDateMainIcon() {
      const { year, month, date } = this.today
      const yTable = {
        172: [2020,]
      }
      const monthTable = { ...this.monthTable }
      const n1 = Object.keys(yTable).filter((key) => yTable[key].includes(year))[0]
      const n2 = monthTable[month] || null
      const n3 = date || null

      let ans = 0
      let sum = 0
      if (n1 && n2 && n3) {
        sum = Number(n1) + Number(n2) + Number(n3)
        if (sum <= 260) {
          ans = sum
        } else {
          let temp = []
          for (let i=0; i<6; i++) {
            temp.push( sum - 260 * i)
            if (sum - 260 * i <= 260 ) break
          }
          ans = temp[temp.length - 1]
        }
      }
      this.today.mainKin = ans
    },
    getIcons(input = this.today.mainKin, tone = this.today.mainTone) {
      const iconTable =  { ...this.iconTable }
      const guideIconTable = { ...this.guideIconTable }
      const colorTable = { ... this.colorTable }

      let temp = []
      for(let i=0; i<13; i++) {
        temp.push(input - 20 * i)
        if (input - 20 * i < 20) break
      }
      const mainNum = temp[temp.length - 1]
      const guideIconGroup = guideIconTable[mainNum]
      const guideIconNum = Object.keys(guideIconGroup).filter((key) => guideIconGroup[key].includes(tone))[0]

      const middleN = mainNum
      const rightN = 19 - mainNum
      const leftN = mainNum < 10 ? mainNum + 10 : mainNum - 10
      const bottomN = 21 - mainNum > 20 ? 21 - mainNum - 20 : 21 - mainNum
      const topN = Number(guideIconNum)
      
      const icons = {
        middle: {
          text: iconTable[mainNum], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(middleN))[0],
          kin: this.today.mainKin
        },
        right: {
          text: iconTable[rightN], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(rightN))[0],
          kin: this.getIconKins('right', rightN)
        },
        left: {
          text: iconTable[leftN],
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(leftN))[0],
          kin: this.getIconKins('left', leftN)
        },
        bottom: {
          text: iconTable[bottomN], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(bottomN))[0],
          kin: this.getIconKins('bottom', bottomN)
        },
        top: {
          text: iconTable[topN],
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(topN))[0],
          kin: this.getIconKins('top', topN)
        },
      }
      return icons
    },
    getIconKins(location, locationN, tone = this.today.mainTone) {
      let temp = []
      let kin = null
      switch(location) {
        case 'bottom':
          for(let i=0; i<13; i++) {
            temp.push(20 * i + locationN)
          }
          kin = temp.filter(elm => (elm - (14 - tone)) % 13 === 0)[0]
          break
        default:
          for(let i=0; i<13; i++) {
            temp.push(20 * i + locationN)
          }
          kin = temp.filter(elm => (elm - tone) % 13 === 0)[0]
          break
      }
      return kin
    },
    getTones(input = this.today.mainKin){
      const toneTable = { ...this.toneTable }
      let temp = []
      for(let i=0; i<20; i++) {
        temp.push(input - 13 * i)
        if (input - 13 * i < 13) break
      }
      const mainTone =  temp[temp.length - 1]
      const tones = {
        middle: toneTable[mainTone],
        right: toneTable[mainTone],
        left: toneTable[mainTone],
        top: toneTable[mainTone],
        bottom: toneTable[14 - mainTone]
      }
      this.today.mainTone = mainTone
      return tones
    },
    setDataAt(input = this.today.hours) {
      const list = [ ...this.timeZones ]
      const temp = this.initData.slice()
      list.forEach((item) => {
        temp.forEach((elm,index) => {
          if (item.val.includes(input) && item.location === elm.location) {
            elm = { ...elm,
              now: true
            }
            this.initData.splice(index, 1, elm)
          }
        })
      })
    },
    setDate(input = new Date()) {
      const d = input
      const year = d.getFullYear()
      const month = d.getMonth()+1
      const date = d.getDate()
      const hours = d.getHours()
      const minutes = d.getMinutes()

      this.today = {
        year,
        month,
        date,
        hours,
        minutes
      }
    },
    showIcons() {
      const tones = this.getTones()
      const icons = this.getIcons()
      const temp = this.initData.slice()
      temp.forEach((data, index) => {
        data = { ...data,
          text: icons[data.location].text,
          tone: tones[data.location],
          color: icons[data.location].color,
          kin: icons[data.location].kin
        }
        this.initData.splice(index, 1, data)
      })
    },
  },
}
</script>

<style scoped>
  .square[data-mc] {      
    font-size: 12px;
    width: 31.5%;
    display: inline-flex;
    margin: 0px 3px;
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