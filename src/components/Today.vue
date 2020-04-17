<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1">
        <div class="font-weight-bold">{{ displayDate }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col 
        class='mc-container col-md-4'
        cols="8">
        <div 
          class="square" 
          v-for='item in custom' 
          :key='"kin" + item.kin' 
          :data-mc='item.location'
          :data-now='item.now'
        >
          <v-img :src='require(`../assets/${item.icon}.png`)'/>
          <div class="text-center">KIN {{ item.kin }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const custom = [
  {location: 'top', icon:'hunabku', kin: 111},
  {location: 'left', icon:'hunabku', kin: 260},
  {location: 'middle', icon:'hunabku', kin: 123},
  {location: 'right', icon:'hunabku', kin: 99},
  {location: 'bottom', icon:'hunabku', kin: 1},
]
export default {
  name: 'today',
  data: () => ({
    today: {},
    custom: custom
  }),
  mounted(){
    this.setDate()
    this.setDataAt()
  },
  computed: {
    displayDate() {
      const { year, month, date } = this.today
      return `${year} / ${month} / ${date}`
    }
  },
  methods: {
    setDate(input = new Date()) {
      const d = input
      const year = d.getFullYear()
      const month = d.getMonth()
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
    setDataAt(input = this.today.hours) {
      const list = [
        { at: 't1', val: [0, 1, 2, 3, 4, 5] },
        { at: 't2', val: [6, 7, 8, 9, 10, 11] },
        { at: 't3', val: [12,13,14,15,16,17] },
        { at: 't4', val: [18,19,20,21,22,23] }
      ]
      const table = {
        t1: 'right', t2: 'top', t3: 'left', t4: 'bottom'
      }
      const temp = this.custom.slice()

      list.forEach((item) => {
        if (item.val.includes(input)) {
          temp.forEach((elm ,index) => {
            if (elm.location === table[item.at]) {
              elm = { ...elm,
                now: true
              }
              this.custom.splice(index, 1, elm)
            }
          })
        }     
      })
    }
  }
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