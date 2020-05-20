<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <p>STEP 1.</p>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
        max-height="170px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date1"
            label="第一個日期"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker1"
          v-model="date1"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="setCustomDate1()"
        >
        </v-date-picker>
      </v-menu>
      
      <p>STEP 2.</p>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
        max-height="170px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date2"
            label="第二個日期"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker2"
          v-model="date2"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="setCustomDate2()"
        ></v-date-picker>
      </v-menu>

      <p>STEP 3.</p>
      <v-btn @click.native="calculate(date1, date2)">計算</v-btn>
    </v-col>
    <v-col>
      <v-expansion-panels
        accordion 
        focusable
      >
        <v-expansion-panel>
          <v-expansion-panel-header>主印記</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table 
              dense
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>kin {{ kinData.kin }}</th>
                    <th class="text-left">關鍵課題</th>
                  </tr>
                </thead>
                <tbody class="text-left">
                  <tr>
                    <td>
                      <div>{{ kinData.toneText }}</div>
                      <div>{{ kinData.sealText }}</div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>波符</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table 
              dense
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">關鍵力量</th>
                    <th class="text-left">圖騰</th>
                  </tr>
                </thead>
                <tbody class="text-left">
                  <tr v-for="(item,index) in waveQuestionBoard" :key="index">
                    <td>
                      <div>{{ item.powerQText }}</div>
                      <div class="caption font-italic">{{ item.toneKeyword }}</div>
                    </td>
                    <td>test12345</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      
      </v-expansion-panels>
    </v-col>
  </v-row>

</template>

<script>
import {
  getWave,
  setInitData,
  handleKinData
} from '../helpers/moonCalender'

export default {
  name: 'relationships',
  data: () => ({
    wave: [],
    kinData: [],
    menu1: false,
    menu2: false,
    date1: '',
    date2: '',
    waveQuestionBoard: [{
      powerQText: '這段關係的源頭是什麼？',
      toneKeyword: '個體 吸引'
    }, {
      powerQText: '這段關係中令人焦慮的部分？',
      toneKeyword: '二元 挑戰'
    }, {
      powerQText: '這段關係的特質？如何合作？',
      toneKeyword: '行動 服務'
    }, {
      powerQText: '這段關係用什麼具體的方式採取行動？',
      toneKeyword: '穩定 具體的形式'
    }, {
      powerQText: '這段關係的最能綻放什麼強大力量？',
      toneKeyword: '放射 力量'
    }, {
      powerQText: '這段關係用什麼方式尋求平衡？',
      toneKeyword: '流動 平等 愛自己'
    }, {
      powerQText: '這段關係以什麼方式和對方共振？以什麼方法讓彼此回到核心？',
      toneKeyword: '反照 共鳴'
    }, {
      powerQText: '這段關係的信念是什麼？',
      toneKeyword: '正義 整合'
    }, {
      powerQText: '這段關係的渴望？',
      toneKeyword: '耐心 毅力 意圖'
    }, {
      powerQText: '這段關係讓彼此目標成真的方式？',
      toneKeyword: '顯化 完美'
    }, {
      powerQText: '這段關係釋放內在信息的方式？',
      toneKeyword: '解析 釋放'
    }, {
      powerQText: '這段關係可以合作的項目？',
      toneKeyword: '理解 合作'
    }, {
      powerQText: '這段關係能成就彼此什麼？',
      toneKeyword: '揚升 超越 橋樑'
    }, ]
  }),
  methods: {
    setCustomDate1(date) {
      this.$refs.menu1.save(date)
    },
    setCustomDate2(date) {
      this.$refs.menu2.save(date)
    },
    calculate(date1, date2) {
      const r1 = setInitData(new Date(date1))
      const r2 = setInitData(new Date(date2))
      const p1 = r1.filter((item) => item.position === 'middle')[0].kin
      const p2 = r2.filter((item) => item.position === 'middle')[0].kin
      const add = p1 + p2 > 260 ?  p1 + p2 - 260 : p1 + p2
      this.kinData = handleKinData(add)
    }
  },
  watch: {
    menu1 (val) {
      val && setTimeout(() => (this.$refs.picker1.activePicker = 'YEAR'))
    },
    menu2 (val) {
      val && setTimeout(() => (this.$refs.picker2.activePicker = 'YEAR'))
    },
  },
}
</script>