<template>
  <v-card class="elevation-12 pb-2">
    <v-card-title class="headline font-weight-regular">Вход</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" validation class="mt-4">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Login"
          placeholder="Ваш логин"
          required
          type="text"
        />

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :counter="true"
          label="Пароль"
          required
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="!valid || loading"
        :loading="loading"
        color="success"
        class="mr-4"
        @click="onLogin"
      >
        Войти
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      valid: false,
      password: '',
      username: '',
      usernameRules: [(v) => !!v || 'Поле Login обязательное'],
      passwordRules: [
        (v) => !!v || 'Поле Пароль обязательное',
        (v) => v.length >= 1 || 'Пароль должен быть не менее 1 символов',
      ],
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
  methods: {
    async onLogin() {
      if (this.$refs.form.validate()) {
        this.$store.commit('setLoading', true)
        try {
          await this.$store.dispatch('auth/loginUser', {
            username: this.username,
            password: this.password,
          })
          await this.$router.push('/profile')
        } catch (e) {
        } finally {
          this.$store.commit('setLoading', false)
        }
      }
    },
  },
}
</script>

<style scoped></style>
