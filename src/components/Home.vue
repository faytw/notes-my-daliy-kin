<template>
  <v-container>
    <v-row class="text-center">
      <notification></notification>
      <!-- Top Nav -->
      <v-col v-if="showtopNav">
        <v-bottom-navigation
          v-model="pageNav"
          dark
        >
          <v-btn value="signature" link to="/signature">
            <v-icon>mdi-heart-half-full</v-icon>
          </v-btn>

          <v-btn value="notebook" link to="/notebook" v-if="showNotebookButton">
            <v-icon>mdi-notebook</v-icon>
          </v-btn>

          <v-btn value="relationships" link to="/relationships/list">
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>
    <!-- Date Infos and  Add notes button-->
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
          link
          to="notebook/notes"
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
    <!-- Home page content -->
    <v-row v-if="showGuideInfos" class="mr-auto ml-auto">
      <v-col class="col-lg-6 col-md-6 mr-auto ml-auto">
        <div class="title mb-2">APP 簡介</div>
        <div class="subtitle-2 mb-4">
          在馬雅系統中， 13 個調性和 20 個圖騰的循環，共有 260 種組合，
          配合卓爾金曆法。每一天都有一個獨特的星系印記。
        </div>
        <div class="mb-4">
          <v-icon>mdi-heart-half-full</v-icon>
          <span class="pl-2">當日星盤</span>
          <ul class="ml-7 caption">
            <li>波符資訊</li>
            <li>調性問句</li>
            <li>圖騰問句</li>
            <li>簡易星盤</li>
            <li>標示綠格</li>
            <li>標示當下區域</li>
          </ul>
        </div>
        <div class="mb-4">
          <v-icon>mdi-calculator</v-icon>
          <span class="pl-2">星盤計算工具</span>
          <ul class="ml-7 caption">
            <li>個人星盤</li>
            <li>關係合盤</li>
            <li>儲存星盤紀錄</li>
          </ul>
        </div>
        <div>
          <v-icon>mdi-notebook</v-icon>
          <span class="pl-2">日記本</span>
          <ul class="ml-7 caption">
            <li>可新增當日筆記</li>
            <li>可閱讀任ㄧ天的日記</li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { 
  setDate,
  setInitData,
} from '../helpers/moonCalender'
import auth from '../helpers/auth'
import { mapActions, mapState } from 'vuex'
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
      notebook: 'notebook',
      home: '123 '
    },
    pageNav: '',
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
    ...mapState('user', [
      'roles',
    ]),
    showEditNoteIcon() {
      return this.$route.name === 'signature'
    },
    showAddNotesButton() {
      return auth.DISPLAY.showAddNotesButton.includes(this.roles[0])
    },
    showArrowButtonStatus() {
      return this.$route.name === 'notebook'
    },
    showDateInfoStatus() {
      const whiteList = ['notebook', 'signature']
      return whiteList.includes(this.$route.name)
    },
    showtopNav() {
      const blackList = ['signIn', 'signOut', 'forgetPassword', 'index']
      return !blackList.includes(this.$route.name)
    },
    showNotebookButton() {
      return auth.NAV.showNotebookButton.includes(this.roles[0])
    },
    showGuideInfos() {
      return this.$route.name === 'index'
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