<template>
  <v-app dark>
    <main-menu />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <my-progress />
    <info />
  </v-app>
</template>

<script>
import Info from '~/components/Info'
import MyProgress from '~/components/MyProgress'
import MainMenu from '~/components/MainMenu'

export default {
  components: {
    Info,
    MyProgress,
    MainMenu,
  },
}
</script>
