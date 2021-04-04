<template>
  <div class="text-center ma-2">
    <template v-if="message">
      <v-snackbar
        :timeout="5000"
        :value="true"
        :color="snackbarColor"
        @input="closeMessage"
      >
        {{ message }}
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" text @click="closeMessage"> Закрыть </v-btn>
        </template>
      </v-snackbar>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Info',
  computed: {
    message() {
      return this.$store.getters.message
    },
    snackbarColor() {
      return this.$store.getters.error ? 'red' : 'green'
    },
  },
  methods: {
    closeMessage() {
      this.$store.commit('clearMessage', { root: true })
    },
  },
}
</script>

<style scoped></style>
