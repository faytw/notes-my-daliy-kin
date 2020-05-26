<template>
  <v-row>
    <v-col>
      <v-stepper v-model="step" vertical>
        <v-stepper-step 
          :complete="step > 1" 
          step="1"
        >
          選擇新增類型
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-radio-group v-model="type" column>
            <v-radio label="個人" value="single"></v-radio>
            <v-radio label="合盤" value="multiple"></v-radio>
          </v-radio-group>

          <v-btn 
            color="primary" 
            @click="setSteps(2)"
          > 
            下一步
          </v-btn>
          <v-btn 
            text 
            href="/relationships"
          >
            回列表
          </v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="step > 2" 
          step="2"
        >
          填寫欄位
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field
            v-model="name1" 
            label="第ㄧ組名稱" 
          >
          </v-text-field>
          <v-menu
            ref="menu1" 
            v-model="menu1" 
            :close-on-content-click="false" 
            transition="scale-transition" 
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field 
                v-model="date1" 
                label="第一組日期" 
                readonly 
                v-on="on"
              >
              </v-text-field>
            </template>

            <v-date-picker 
              ref="picker1" 
              v-model="date1" 
              :max="new Date().toISOString().substr(0, 10)" 
              min="1950-01-01"
              @change="setCustomDate1()">
            </v-date-picker>
          </v-menu>

          <v-text-field
            v-if="type === 'multiple'"
            v-model="name2" 
            label="第二組名稱" 
          >
          </v-text-field>
          <v-menu 
            v-if="type === 'multiple'"
            ref="menu2" 
            v-model="menu2" 
            :close-on-content-click="false" 
            transition="scale-transition" 
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field 
                v-model="date2" 
                label="第二組日期" 
                readonly 
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker 
              ref="picker2" 
              v-model="date2" 
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="setCustomDate2()"
            >
            </v-date-picker>
          </v-menu>

          <v-btn 
            color="primary" 
            @click="setSteps(3)"
          >
            計算
          </v-btn>
          <v-btn 
            text 
            @click="setSteps(1)"
          >
            上一步
          </v-btn>
        </v-stepper-content>

        <v-stepper-step 
          :complete="step > 3" 
          step="3"
        >
          結果
        </v-stepper-step>
        <v-stepper-content step="3">
          <div class="signature-infos" v-if="type === 'single'">
            <div class="d-flex">
              <span>{{ showSignatureInfos(signature1) }}</span>
              <v-icon @click="save(signature1, name1)">mdi-content-save</v-icon>
            </div>
          </div>
          <div class="signature-infos" v-else>
            <div class="d-flex">
              <span>{{ showSignatureInfos(signature1) }}</span>
              <v-icon @click="save(signature1, name1)">mdi-content-save</v-icon>
            </div>
            <div class="d-flex">
              <span>{{ showSignatureInfos(signature2) }}</span>
              <v-icon @click="save(signature2, name2)">mdi-content-save</v-icon>
            </div>
            <div class="d-flex">
              <span>{{ showSignatureInfos(signature3) }}</span>
              <v-icon  @click="save(signature3, name3)">mdi-content-save</v-icon>
            </div>
          </div>

           <v-btn 
            color="primary" 
            @click="setSteps(1, true)"
          >
            再算一次
          </v-btn>
          <v-btn 
            text 
            href="/relationships"
          >
            回列表
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
  import {
    setInitData,
    calulateRelationshipsData
  } from '../helpers/moonCalender'
  import { mapState, mapActions } from 'vuex'
  import uuid from '../helpers/uuid' 

  export default {
    name: 'relationshipStepper',
    data: () => ({
      type: 'single',
      step: 1,
      name1: '',
      name2: '',
      name3: '',
      menu1: false,
      menu2: false,
      signature1: [],
      signature2: [],
      signature3: [],
      date1: '',
      date2: '',
    }),
    beforeDestroy() {
      this.setDefaultValue()
    },
    computed: {
      ...mapState('user', [
        'email'
      ]),
      kin1() {
        return this.signature1.length > 0 && this.signature1.filter((item) => item.position === 'middle')[0].kin || null
      },
      kin2() {
        return this.signature2.length > 0 && this.signature2.filter((item) => item.position === 'middle')[0].kin || null
      },
    },
    methods: {
      ...mapActions('logs', {
        createLogs: 'CREATE_LOGS'
      }),
      save(signature, name){
        const signID = uuid.set()
        const data = {
          signature,
          user: this.email,
          name,
          signID, 
        }
        this.createLogs(data)
      },
      setDefaultValue() {
        this.type = 'single'
        this.step = 1
        this.name1 = ''
        this.name2 = ''
        this.menu1 = false
        this.menu2 = false
        this.signature1 = []
        this.signature2 = []
        this.signature3 = []
        this.date1 = ''
        this.date2 = ''
      },
      showSignatureInfos(signature) {
        if (this.step === 3) {
          const middle = signature.filter((item) => item.position === 'middle')[0]
          const { toneText, sealText, kin} = middle
          const tone = this.$t(`toneText.${toneText}`)
          const seal = this.$t(`sealText.${sealText}`)
          return `KIN${kin} ${tone}${seal}`
        }
      },
      setSteps(step, completed = false) {
        switch(step) {
          case 1:
            if (completed) {
              this.step = step
              this.setDefaultValue()
            } else {
              this.step = step
            }
            break
          case 2:
            this.step = step
            break
          case 3:
            if (completed) {
              this.step = step
            } else {
              this.calculateSignatures(this.date1, this.date2)
              this.calculateKinsData(this.kin1, this.kin2)
            }
            break
        }
      },
      setCustomDate1(date) {
        this.$refs.menu1.save(date)
      },
      setCustomDate2(date) {
        this.$refs.menu2.save(date)
      },
      calculateSignatures(date1, date2) {
        if (date1) {
          this.signature1 = setInitData(new Date(date1))
        }
        if(date2) {
          this.signature2 = setInitData(new Date(date2))
        }
      },
      calculateKinsData(kin1, kin2) {
        let kin = 0
        if (kin2) {
          kin = kin1 + kin2 > 260 ? kin1 + kin2 - 260 : kin1 + kin2
        } else {
          kin = kin1
        }
        const data = calulateRelationshipsData(kin)
        if (data && Object.entries(data).length > 0) {
          this.signature1 = kin2 ? this.signature1 : data
          this.signature3 = kin2 ? data : []
          this.setSteps(3, true)
        } else {
          // TODO: Add error handler
        }
      },
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

<style scoped>
.signature-infos {
  margin-bottom: 20px;
}
.signature-infos .d-flex {
  justify-content: space-between;
}

.signature-unsaved {
  color: #2196f3;
}
.signature-saved {
  color: forestgreen;
}
</style>