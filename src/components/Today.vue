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
    today: {},
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
      return ans
    },
    getIcons(input) {
      const iconTable =  {
        0: '太陽', 1: '龍', 2: '風', 3: '夜', 4: '種子', 5: '蛇', 6: '世界橋' , 7: '手', 8: '星星', 9: '月',
        10: '狗', 11: '猴', 12: '人', 13: '天行者', 14: '巫師', 15: '鷹', 16: '戰士', 17: '地球', 18: '鏡',
        19: '風暴',
      }
      let temp = []
      for(let i=0; i<13; i++) {
        temp.push(input - 20 * i)
        if (input - 20 * i < 20) break
      }
      const mainNum = temp[temp.length - 1]
      const icons = {
        middle: iconTable[mainNum],
        right: iconTable[19 - mainNum],
        left: mainNum < 10 ? iconTable[mainNum + 10] : iconTable[mainNum - 10],
        bottom: 21 - mainNum > 20 ? iconTable[21 - mainNum - 20] : iconTable[21 - mainNum]
      }
      return icons
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
      const val = this.calulateDateMainIcon()
      const icons = this.getIcons(val)
      const temp = this.initData.slice()
      temp.forEach((data, index) => {
        if(data.location === 'middle') {
          data = { ...data,
            kin: val,
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