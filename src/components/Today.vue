<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1">
        <div class="font-weight-bold">{{ `${today.year} / ${today.month} / ${today.date}` }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col 
        class='mc-container col-md-4'
        cols="8">
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
          <div class="text-center">KIN {{ item.kin }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
    ]
  }),
  mounted(){
    this.setDate()
    this.setDataAt()
    this.calulateDateMainIcon()
    this.showTones()
    this.showIcons()
  },
  methods: {
    calulateDateMainIcon() {
      const { year, month, date } = this.today
      const yTable = {
        172: [2020,]
      }
      const mTable = {
        1: 0, 2: 31, 3: 59, 4: 90, 5: 120, 6: 151,
        7: 181, 8: 212, 9: 243, 10: 13, 11: 44, 12: 74 
      }
      const n1 = Object.keys(yTable).filter((key) => yTable[key].includes(year) ? key : null)[0]
      const n2 = mTable[month] || null
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
      const iconTable =  {
        0: '太陽', 1: '龍', 2: '風', 3: '夜', 4: '種子', 5: '蛇', 6: '世界橋' , 7: '手', 8: '星星', 9: '月',
        10: '狗', 11: '猴', 12: '人', 13: '天行者', 14: '巫師', 15: '鷹', 16: '戰士', 17: '地球', 18: '鏡',
        19: '風暴',
      }
      const guideIconTable = {
        0: { 0: [1, 6, 11], 12: [2, 7, 12], 4: [3, 8, 13], 16: [4, 9],  8: [5, 10]},
        1: { 1: [1, 6, 11], 13: [2, 7, 12], 5: [3, 8, 13], 17: [4, 9],  9: [5, 10]},
        2: { 2: [1, 6, 11], 14: [2, 7, 12], 6: [3, 8, 13], 18: [4, 9], 10: [5, 10]},
        3: { 3: [1, 6, 11], 15: [2, 7, 12], 7: [3, 8, 13], 19: [4, 9], 11: [5, 10]},
        4: { 4: [1, 6, 11], 16: [2, 7, 12], 8: [3, 8, 13],  0: [4, 9], 12: [5, 10]},
        5: { 5: [1, 6, 11], 17: [2, 7, 12], 9: [3, 8, 13],  1: [4, 9], 13: [5, 10]},
        6: { 6: [1, 6, 11], 18: [2, 7, 12], 10: [3, 8, 13], 2: [4, 9], 14: [5, 10]},
        7: { 7: [1, 6, 11], 19: [2, 7, 12], 11: [3, 8, 13], 3: [4, 9],  15: [5, 10]},
        8: { 8: [1, 6, 11],  0: [2, 7, 12], 12: [3, 8, 13], 4: [4, 9],  16: [5, 10]},
        9: { 9: [1, 6, 11],  1: [2, 7, 12], 13: [3, 8, 13], 5: [4, 9], 17: [5, 10]},
        10: { 10: [1, 6, 11], 2: [2, 7, 12], 14: [3, 8, 13], 6: [4, 9], 18: [5, 10]},
        11: { 11: [1, 6, 11], 3: [2, 7, 12], 15: [3, 8, 13],  7: [4, 9], 19: [5, 10]},
        12: { 12: [1, 6, 11], 4: [2, 7, 12], 16: [3, 8, 13],  8: [4, 9], 0: [5, 10]},
        13: { 13: [1, 6, 11], 5: [2, 7, 12], 17: [3, 8, 13], 9: [4, 9], 1: [5, 10]},
        14: { 14: [1, 6, 11], 6: [2, 7, 12], 18: [3, 8, 13],  10: [4, 9], 2: [5, 10]},
        15: { 15: [1, 6, 11], 7: [2, 7, 12], 19: [3, 8, 13],  11: [4, 9], 3: [5, 10]},
        16: { 16: [1, 6, 11], 8: [2, 7, 12], 0: [3, 8, 13], 12: [4, 9], 4: [5, 10]},
        17: { 17: [1, 6, 11], 9: [2, 7, 12], 1: [3, 8, 13], 13: [4, 9], 5: [5, 10]},
        18: { 18: [1, 6, 11], 10: [2, 7, 12], 2: [3, 8, 13], 14: [4, 9], 6: [5, 10]},
        19: { 19: [1, 6, 11], 11: [2, 7, 12], 3: [3, 8, 13], 15: [4, 9], 7: [5, 10]},
      }
      let temp = []
      for(let i=0; i<13; i++) {
        temp.push(input - 20 * i)
        if (input - 20 * i < 20) break
      }
      const mainNum = temp[temp.length - 1]
      const guideIconGroup = guideIconTable[mainNum]
      const guideIconNum = Object.keys(guideIconGroup).filter((key) => guideIconGroup[key].includes(tone) ? key : null) [0]
      
      const icons = {
        middle: iconTable[mainNum],
        right: iconTable[19 - mainNum],
        left: mainNum < 10 ? iconTable[mainNum + 10] : iconTable[mainNum - 10],
        bottom: 21 - mainNum > 20 ? iconTable[21 - mainNum - 20] : iconTable[21 - mainNum],
        top: iconTable[guideIconNum]
      }
      return icons
    },
    getTones(input = this.today.mainKin){
      const toneTable = {
        1: '磁性', 2: '月亮', 3: '電力', 4: '自我存在', 5: '超頻', 6: '韻律', 7: '共振',
        8: '銀河', 9: '太陽', 10: '行星', 11: '光譜', 12: '水晶', 13: '宇宙'
      }
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
      const list = [{ 
        location: 'right',
        val: [0, 1, 2, 3, 4, 5],
      },
      { 
        location: 'top',
        val: [6, 7, 8, 9, 10, 11],
      },
      { 
        location: 'left',
        val: [12, 13, 14, 15, 16, 17] ,
      },
      { 
        location: 'bottom',
        val: [18, 19, 20, 21, 22, 23],
      }]
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
      const icons = this.getIcons()
      const temp = this.initData.slice()
      temp.forEach((data, index) => {
        if(data.location === 'middle') {
          data = { ...data,
            kin: this.today.mainKin,
            text: icons[data.location]
          }
        } else {
          data = { ...data,
            text: icons[data.location]
          }
        }
        this.initData.splice(index, 1, data)
      })
    },
    showTones() {
      const tones = this.getTones()
      const temp = this.initData.slice()
      temp.forEach((data, index) => {
        data = { ...data,
          tone: tones[data.location]
        }
        this.initData.splice(index, 1, data)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .square[data-mc] {      
    font-size: 12px;
    width: 30%;
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