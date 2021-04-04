<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="text-center">
        <h1>Список заказов</h1>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Profile',
  middleware: ['auth'],
}
</script>

<style scoped></style>
