<template>
<v-col>
  <ValidationObserver ref="signInForm">
    <form class="text-center">
      <ValidationProvider 
        v-slot="{ errors }" 
        name="signInForm.name" 
        rules="required|max:15">
        <v-text-field
          v-model="name" 
          :counter="15" 
          :error-messages="errors" 
          label="名稱" 
          required>
        </v-text-field>
      </ValidationProvider>
      <ValidationProvider 
        v-slot="{ errors }" 
        name="signInForm.email" 
        rules="required|email">
        <v-text-field 
          v-model="email" 
          :error-messages="errors" 
          label="Email" 
          required
        >
        </v-text-field>
      </ValidationProvider>
      <ValidationProvider 
        v-slot="{ errors }" 
        name="signInForm.password"
        rules="required|password">
        <v-text-field 
          v-model="password" 
          :error-messages="errors" 
          label="密碼" 
          required
        >
        </v-text-field>
      </ValidationProvider>

      <div class="mt-3">
        <v-btn class="mr-4" @click="submit">送出</v-btn>
        <v-btn @click="clear">清除</v-btn>
      </div>
    </form>
  </ValidationObserver>
</v-col>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: 'signIn',
  data: () => ({
    name: '',
    password: '',
    email: '',
  }),
  methods: {
    submit() {
      this.$refs.signInForm.validate().then((valid)=>{
        if (valid) {
          // TODO: call login api to get user infos
        }
      }) 
    },
    clear() {
      this.$refs.signInForm.reset()
    },
  },
}
</script>

<style scoped>
</style>