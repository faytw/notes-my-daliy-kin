<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-1 font-weight-bold">
        <span @click="goDate('yesterday', date)">
          <v-icon>mdi-chevron-left</v-icon>
        </span>
        <span>{{ displayDateFormat }}</span>
         <span @click="goDate('tomorrow', date)">
          <v-icon>mdi-chevron-right</v-icon>
        </span>
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
  setDate,
} from '../helpers/moonCalender'

export default {
  name: 'home',
  data: () => ({
    dateNow: dateNow || {},
    date: '',
    displayDateFormat: '',
    pageNav: 'signature',
  }),
  mounted() {
    this.setDisplayFormat()
    this.pageNav = this.$route.name
  },
  methods: {
    goDate(type, date) {
      const d = date || new Date()
      switch(type) {
        case 'yesterday':
          d.setDate(d.getDate() - 1)
          break
        case 'tomorrow':
          d.setDate(d.getDate() + 1)
          break
      }
      this.date = d
      this.setDisplayFormat(setDate(d))
    },
    goToPage(pathName) {
      this.$router.push(`/${pathName}`)
      this.pageNav = pathName
    },
    setDisplayFormat(input = this.dateNow) {
      const { year, month, date } = input
      this.displayDateFormat =  `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${date < 10 ? '0' + (date) : date}`
    },
  }
}
</script>

<style scoped>
 .v-bottom-navigation--fixed {position: fixed !important;}

.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}
</style>