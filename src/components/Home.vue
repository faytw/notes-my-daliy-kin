<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-bottom-navigation
          v-model="pageNav"
          dark
        >
          <v-btn value="signature" href="/signature">
            <span v-t="`nav.signature`"></span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>

          <v-btn value="notes" href="/notes">
            <span v-t="`nav.notes`"></span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>

          <v-btn value="notebook" href="/notebook">
            <span v-t="`nav.notebook`"></span>
            <v-icon>mdi-notebook</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>

    <v-row class="text-center" v-if="showDateInfoStatus">
      <v-col class="mb-1 font-weight-bold">
        <span 
          v-show="showArrowButtonStatus" 
          @click="goDate('yesterday')"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </span>
        <span>{{ displayDateFormat }}</span>
        <span 
          v-show="showArrowButtonStatus"
          @click="goDate('tomorrow')"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </span>
      </v-col>
    </v-row>

    <router-view></router-view>

  </v-container>
</template>

<script>
import { 
  setDate,
  setInitData,
} from '../helpers/moonCalender'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'home',
  data: () => ({
    displayDateFormat: '',
    displayDate: new Date(),
    pageNav: 'signature',
  }),
  mounted() {
    this.setDisplayFormat()
    this.pageNav = this.$route.name
    this.init()
  },
  computed: {
    ...mapState('signature', [
      'displayKin',
    ]),
    showArrowButtonStatus() {
      return this.$route.name === 'notebook'
    },
    showDateInfoStatus() {
      return this.$route.name !== 'notes'
    }
  },
  methods: {
    ...mapActions('signature',{
      initAppData: 'INIT_APP_DATA',
      setDisplayKin: 'SET_DISPLAY_KIN',
    }),
    init() {
      const infos = setInitData()
      this.initAppData(infos)
    },
    goDate(type, input, days = 1) {
      const d = this.displayDate
      let kin = this.displayKin
      switch(type) {
        case 'yesterday':
          d.setDate(d.getDate() - days)
          kin -= days
          break
        case 'tomorrow':
          d.setDate(d.getDate() + days)
          kin += days
          break
      }
      setInitData(d)
      this.setDisplayFormat(d)
      this.setDisplayKin(kin)
    },
    setDisplayFormat(input = new Date()) {
      this.displayDate = input    
      const { year, month, date } = setDate(input)
      this.displayDateFormat =  `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${date < 10 ? '0' + (date) : date}`
    },
  }
}
</script>

<style scoped>
 .v-bottom-navigation--fixed {position: fixed !important;}

.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}
</style>