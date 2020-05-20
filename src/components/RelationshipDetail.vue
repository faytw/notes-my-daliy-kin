<template>
  <v-row>
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

export default {
  name: 'relationshipDetail',
  data: () => ({
    kinData: {},
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
}
</script>