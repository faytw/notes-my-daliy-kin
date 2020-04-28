<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <div>{{ displayTodayFormat }}</div>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <v-bottom-navigation
          v-model="pageNav"
          dark
        >
          <v-btn value="signature" @click="goToPage('signature')">
            <span v-t="`nav.signature`"></span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>

          <v-btn value="notes" @click="goToPage('notes')">
            <span v-t="`nav.notes`"></span>
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>

          <v-btn value="notebook" @click="goToPage('notebook')">
            <span v-t="`nav.notebook`"></span>
            <v-icon>mdi-notebook</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>
    </v-row>

    <router-view></router-view>

  </v-container>
</template>

<script>
import { 
  dateNow, 
} from '../helpers/moonCalender'

export default {
  name: 'home',
  data: () => ({
    dateNow: dateNow || {},
    displayTodayFormat: '',
    pageNav: 'signature',
  }),
  mounted() {
    this.setDisplayTodayFormat()
    this.pageNav = this.$route.name
  },
  methods: {
    goToPage(pathName) {
      this.$router.push(`/${pathName}`)
      this.pageNav = pathName
    },
    setDisplayTodayFormat() {
      const { year, month, date } = this.dateNow
      this.displayTodayFormat =  `${year}-${month < 10 ? '0' + month : month}-${date}`
    },
  }
}
</script>

<style scoped>
 .v-bottom-navigation--fixed {position: fixed !important;}

.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}
</style>