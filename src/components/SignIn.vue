<template>
<v-col>
  <ValidationObserver ref="signInForm">
    <form class="text-center">
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

      <div class="mt-3">
        <v-btn class="mr-4" @click="visitorSubmit">訪客登入</v-btn>
        <v-btn class="mr-4" @click="submit">送出</v-btn>
      </div>
    </form>
  </ValidationObserver>
</v-col>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'signIn',
  data: () => ({
    password: 'developer777',
    email: 'developer-account@gmail.com',
  }),
  methods: {
    ...mapActions('user', {
      getUserToken: 'GET_USER_TOKEN',
      getVisitorInfos: 'GET_VISITOR_INFOS',
    }),
    submit() {
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
    },
  },
}
</script>
