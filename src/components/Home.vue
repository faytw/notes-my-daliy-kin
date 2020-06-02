<template>
  <v-container>
    <v-row class="text-center">
      <notification></notification>
      <v-col v-if="showtopNav">
        <v-bottom-navigation
          v-model="pageNav"
          dark
        >
          <v-btn value="signature" href="/signature">
            <v-icon>mdi-heart-half-full</v-icon>
          </v-btn>

          <v-btn value="notebook" href="/notebook" v-if="showNotebookButton">
            <v-icon>mdi-notebook</v-icon>
          </v-btn>

          <v-btn value="relationships" href="/relationships/list">
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>

    <v-row class="text-center justify-center" v-if="showDateInfoStatus">
      <v-col class="mb-1 font-weight-bold">
        <span 
          v-show="showArrowButtonStatus" 
          @click="goDate('yesterday')"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </span>
      </v-col>
      <v-col :cols="showEditNoteIcon ? 10: 8">
        <span>{{ displayDateFormat }}</span>
         <v-btn 
          href="notebook/create-notes"
          v-if="showEditNoteIcon && showAddNotesButton"
          text
        >
          <v-icon>mdi-pen-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col>
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
import { mapActions, mapState, mapGetters } from 'vuex'
import Notification from './Notification.vue'

export default {
  name: 'home',
  data: () => ({
    displayDateFormat: '',
    displayDate: new Date(),
    routeNameConfig: {
      relationshipList: 'relationships',
      relationshipStepper: 'relationships',
      signature: 'signature',
      notes: 'notebook',
      notebook: 'notebook'
    },
    pageNav: 'signature',
  }),
  components: {
    Notification,
  },
  mounted() {
    this.setDisplayFormat()
    this.pageNav = this.routeNameConfig[this.$route.name]
    this.initApp()
  },
  computed: {
    ...mapState('signature', [
      'displayKin',
    ]),
    ...mapGetters('user', [
      'showNotebookButton',
      'showAddNotesButton'
    ]),
    showEditNoteIcon() {
      return this.$route.name === 'signature'
    },
    showArrowButtonStatus() {
      return this.$route.name === 'notebook'
    },
    showDateInfoStatus() {
      const whiteList = ['notebook', 'signature']
      return whiteList.includes(this.$route.name)
    },
    showtopNav() {
      const blackList = ['signIn', 'signOut', 'forgetPassword']
      return !blackList.includes(this.$route.name)
    },
  },
  methods: {
    ...mapActions('signature',{
      initDefaultValues: 'INIT_APP_DATA',
      setDisplayKin: 'SET_DISPLAY_KIN',
    }),
    initApp() {
      const infos = setInitData()
      this.initDefaultValues(infos)
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
      this.displayDateFormat =  `西元 ${year} 年 ${month < 10 ? '0' + (month + 1) : (month + 1)} 月 ${date < 10 ? '0' + (date) : date} 日`
    },
  }
}
</script>

<style scoped>
.v-bottom-navigation--fixed { position: fixed !important; }
.v-item-group.v-bottom-navigation .v-btn { height: inherit !important; }
</style>