<template>
  <v-container v-if="loading" style="height: 100px">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col class="subtitle-1 text-center" cols="12"> Загрузка данных </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MyProgress',
  computed: {
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>

<style scoped></style>
