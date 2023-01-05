<template>
  <v-app-bar fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-btn v-for="item in links" :key="item.title" plain :to="item.url">
      {{ item.title }}
    </v-btn>
    <v-spacer />
    <v-btn v-if="isLoggedIn" right plain @click="onLogout"> Выйти </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      title: 'ГК Меркурий: track лист',
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
          { title: 'Заявки', icon: 'mdi-home', url: '/profile' },
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
