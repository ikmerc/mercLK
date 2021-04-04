<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="text-center">
        <login-form />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import LoginForm from '~/components/Auth/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
}
</script>

<style scoped></style>
