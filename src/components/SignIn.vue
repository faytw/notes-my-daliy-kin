<template>
<v-col class="pr-6 pl-6">
  <div class="mt-4 mb-4">歡迎使用馬雅曆共時筆記。</div>
  <div class="mb-5">
    <div class="subtitle-2">您可以用訪客身份進入 APP，享受部分功能，或者您可以用認證帳號進入 APP，享受所有功能</div>
  </div>
  <v-select
    class="pr-4 pl-4 mb-5"
    v-model="mode"
    :items="items"
    outlined
    dense
    hide-details
  >
  </v-select>
  <div v-show="mode === 'account'">
    <ValidationObserver ref="signInForm">
      <form class="pr-4 pl-4">
        <ValidationProvider 
          v-slot="{ errors }" 
          name="signInForm.email" 
          rules="required|email">
          <v-text-field 
            v-model="email" 
            :error-messages="errors" 
            label="Email" 
            required
            autocomplete="username"
          >
          </v-text-field>
        </ValidationProvider>
        <ValidationProvider 
          v-slot="{ errors }" 
          name="signInForm.password"
          rules="required">
          <v-text-field 
            type="password"
            v-model="password" 
            :error-messages="errors" 
            label="密碼" 
            required
            autocomplete="current-password"
          >
          </v-text-field>
        </ValidationProvider>
      </form>
    </ValidationObserver>
  </div>
  <div class="text-center">
    <v-btn 
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
    password: null,
    email: null,
    mode: 'visit',
    items: [
      { 
        text: '以訪客身份登入',
        value: 'visit',
      },{
        text: '以認證帳號登入',
        value: 'account',
      }
    ],
  }),
  methods: {
    ...mapActions('user', {
      getUserToken: 'GET_USER_TOKEN',
      getVisitorInfos: 'GET_VISITOR_INFOS',
    }),
    submit() {
      const MODE = this.mode
      switch(MODE) {
        case 'account':
          this.normalSubmit()
          break
        case 'visit':
          this.visitorSubmit()
          break
      }
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
      const payload = {
        name: 'visitor',
        roles: ['visitor'],
        id: 'visitor-987654321-000000'
      }
      this.getVisitorInfos(payload)
    }
  },
}
</script>
