<template>
  <v-app-bar fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn v-for="item in links" :key="item.title" plain :to="item.url">
      {{ item.title }}
    </v-btn>
    <v-btn v-if="isLoggedIn" plain @click="onLogout"> Выйти </v-btn>
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      title: 'ООО Торговый дом',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    links() {
      if (!this.isLoggedIn) {
        return [
          { title: 'Главная', icon: 'mdi-home', url: '/' },
          { title: 'Войти', icon: 'mdi-home', url: '/login' },
        ]
      } else {
        return [
          { title: 'Главная', icon: 'mdi-home', url: '/' },
          { title: 'Профиль', icon: 'mdi-home', url: '/profile' },
        ]
      }
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('auth/logoutUser')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
