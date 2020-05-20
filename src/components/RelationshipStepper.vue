<template>
  <v-row>
    <v-col>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Select an app
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date1" label="第一組日期" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker ref="picker1" v-model="date1" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01"
              @change="setCustomDate1()">
            </v-date-picker>
          </v-menu>

          <v-btn color="primary" @click="e6 = 2">下一步</v-btn>
          <v-btn text>回列表</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="2">
          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date2" label="第二組日期" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker ref="picker2" v-model="date2" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01"
              @change="setCustomDate2()"></v-date-picker>
          </v-menu>

          <v-btn color="primary" @click="e6 = 3">計算合盤</v-btn>
          <v-btn text>上一步</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="3">
          <div>
            <span>signature1</span>
            <v-icon>mdi-content-save-outline</v-icon>
          </div>
          <div>
            <span>signature2</span>
            <v-icon>mdi-content-save-outline</v-icon>
          </div>
          <div>
            <span>signature1 + signature2</span>
            <v-icon>mdi-content-save-outline</v-icon>
          </div>
        </v-stepper-content>

      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
  import {
    setInitData,
    handleKinData
  } from '../helpers/moonCalender'

  export default {
    name: 'relationshipStepper',
    data: () => ({
      e6: 1,
      kinData: {},
      menu1: false,
      menu2: false,
      signature1: {},
      signature2: {},
      date1: '',
      date2: '',
    }),
    methods: {
      setCustomDate1(date) {
        this.$refs.menu1.save(date)
      },
      setCustomDate2(date) {
        this.$refs.menu2.save(date)
      },
      calculate(date1, date2) {
        this.signature1 = setInitData(new Date(date1))
        this.signature2 = setInitData(new Date(date2))
        const p1 = this.signature1.filter((item) => item.position === 'middle')[0].kin
        const p2 = this.signature2.filter((item) => item.position === 'middle')[0].kin
        const add = p1 + p2 > 260 ? p1 + p2 - 260 : p1 + p2
        this.kinData = handleKinData(add)
      }
    },
    watch: {
      menu1(val) {
        val && setTimeout(() => (this.$refs.picker1.activePicker = 'YEAR'))
      },
      menu2(val) {
        val && setTimeout(() => (this.$refs.picker2.activePicker = 'YEAR'))
      },
    },
  }
</script>