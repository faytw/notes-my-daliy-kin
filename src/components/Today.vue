<template>
<v-container>
    <v-row class="text-center">
      <v-col class="mb-1">
        <div class="font-weight-bold">{{ displayDate }}</div>
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center">
          <v-col 
            class='mc-container col-md-4'
            cols="8">
            <div 
              class="square" 
              v-for='item in custom' 
              :key='"kin" + item.kin' 
              :data-mc='item.location'
            >
              <v-img :src='require(`../assets/${item.icon}.png`)'/>
              <div>KIN {{ item.kin }}</div>
            </div>
          </v-col>
        </v-row>
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
    displayDate: '',
    custom: custom
  }),
  mounted(){
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const date = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()

    this.displayDate = `${year} / ${month} / ${date}`
    this.displayTime = `${hour} : ${minute}`
  }
}
</script>

<style lang="scss" scoped>
  .square[data-mc] {      
    font-size: 12px;
    width: 30%;
    display: inline-block;
    margin: 0px 3px;
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
  .display-time {
    font-size: 0.375em;
  }
</style>