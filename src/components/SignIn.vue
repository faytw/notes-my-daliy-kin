<template>
<v-col class="pr-6 pl-6 col-lg-4 col-md-5 col-sm-6 mr-auto ml-auto">
  <div class="mt-4 mb-4" data-cy="Contnet-Login-Info-Title">歡迎使用馬雅曆共時筆記。</div>
  <div class="mb-5">
    <div class="subtitle-2" data-cy="Contnet-Login-Info-Text">您可以用訪客身份進入 APP，享受部分功能，或者您可以用認證帳號進入 APP，享受所有功能</div>
  </div>
  <v-select
    data-cy="Content-Login-Select"
    class="mb-5"
    v-model="mode"
    :items="items"
    outlined
    dense
    hide-details
  >
  </v-select>
  <ValidationObserver ref="signInForm">
    <form class="pr-4 pl-4">
      <ValidationProvider 
        v-slot="{ errors }" 
        name="signInForm.email" 
        rules="required|email">
        <v-text-field 
          data-cy="Content-Login-Input-Email"
          v-model="email" 
          :error-messages="errors" 
          label="Email" 
          required
          autocomplete="username"
          :disabled="mode !== 'account'"
        >
        </v-text-field>
      </ValidationProvider>
      <ValidationProvider 
        v-slot="{ errors }" 
        name="signInForm.password"
        rules="required">
        <v-text-field 
          data-cy="Content-Login-Input-Password"
          type="password"
          v-model="password" 
          :error-messages="errors" 
          label="密碼" 
          required
          autocomplete="current-password"
          :disabled="mode !== 'account'"
        >
        </v-text-field>
      </ValidationProvider>
    </form>
  </ValidationObserver>
  <div class="text-center mt-5">
    <v-btn 
      data-cy="Content-Login-Button-Submit"
      width="50%"
      class="primary"
      @click="submit">送出</v-btn>
  </div>
</v-col>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'signIn',
  data: () => ({
    password: '1qaz2wsx',
    email: 'visitor-account@test.com',
    mode: 'visit',
    items: [
      { 
        text: '以訪客身份登入',
        value: 'visit',
      },{
        text: '以測試帳號登入',
        value: 'develop',
      },{
        text: '以認證帳號登入',
        value: 'account'
      }
    ],
  }),
  watch: {
    mode(val, oldVal) {
      switch(val) {
        case 'visit':
          this.email = 'visitor-account@test.com',
          this.password = '1qaz2wsx'
          break
        case 'develop':
          this.email = 'developer-account@gmail.com',
          this.password = 'developer777'
          break
        case 'account':
          if(val !== oldVal) {
            this.email = '',
            this.password = ''
          }
          break
      }
    }
  },
  methods: {
    ...mapActions('user', {
      getUserToken: 'GET_USER_TOKEN',
      getVisitorInfos: 'GET_VISITOR_INFOS',
    }),
    submit() {
      const signInType = this.mode
      switch(signInType) {
        case 'account':
          this.normalSubmit()
          break
        case 'visit':
          this.visitorSubmit()
          break
        case 'develop':
          this.developSubmit()
          break
      }
    },
    developSubmit() {
      const params = {
        email: this.email,
        password: this.password,
      }
      this.getUserToken(params)
    },
    normalSubmit() {
      this.$refs.signInForm.validate().then((valid) => {
        if (valid) {
          const params = {
            email: this.email,
            password: this.password,
          }
          this.getUserToken(params)
        }
      }) 
    },
    visitorSubmit() {
      const name = process.env.VUE_APP_LOGIN_VISTOR_NAME
      const roles = [process.env.VUE_APP_LOGIN_VISTOR_ROLE]
      const id = process.env.VUE_APP_LOGIN_VISTOR_ID
      
      const payload = { name, roles, id }
      this.getVisitorInfos(payload)
    }
  },
}
</script>
