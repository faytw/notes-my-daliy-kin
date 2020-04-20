<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <div>{{ `${today.year} / ${today.month} / ${today.date}` }}</div>
        <div>KIN {{ today.mainKin }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col 
        class='mc-container col-md-4'
        cols="10">
        <div 
          class="square" 
          v-for='item in initData' 
          :key='item.location' 
          :data-mc='item.location'
          :data-now='item.now'
        >
          <v-img :src='require(`../assets/${ item.icon }.png`)'/>
          <div class="text-center">{{ item.tone }}</div>
          <div class="text-center">{{ item.text }}</div>
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
      const guideIconNum = Object.keys(guideIconGroup).filter((key) => guideIconGroup[key].includes(tone))

      const middleN = mainNum
      const rightN = 19 - mainNum
      const leftN = mainNum < 10 ? mainNum + 10 : mainNum - 10
      const bottomN = 21 - mainNum > 20 ? 21 - mainNum - 20 : 21 - mainNum
      const topN = guideIconNum
      
      const icons = {
        middle: {
          text: iconTable[mainNum], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(middleN))[0]
        },
        right: {
          text: iconTable[rightN], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(rightN))[0]
        },
        left: {
          text: iconTable[leftN],
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(leftN))[0]
        },
        bottom: {
          text: iconTable[bottomN], 
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(bottomN))[0]
        },
        top: {
          text: iconTable[topN],
          color: Object.keys(colorTable).filter((key) => colorTable[key].includes(topN))[0]
        },
      }
      return icons
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
        }
        this.initData.splice(index, 1, data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .square[data-mc] {      
    font-size: 12px;
    width: 31%;
    display: inline-block;
    margin: 0px 3px;
    padding: 3px 5px;
  }
  .square[data-mc='top'] {
    display: block;
    margin: 0 auto;
    margin-bottom: 5px
  }
  .square[data-mc='bottom'] {
    display: block;
    margin: 0 auto;
    margin-top: 5px
  }
  .square[data-now] {
    box-shadow: 3px 3px 3px cadetblue;
    border-radius: 8px;
  }
  .display-time {
    font-size: 0.375em;
  }
</style>