<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>Новая заявка</h1>
      <v-form ref="form" v-model="valid">
        <v-textarea
          v-model="note"
          solo
          aria-required="true"
          name="note"
          :rules="[
            (v) =>
              (v || '').length > 20 ||
              'Текст заявки должен быть длиннее 20 символов',
          ]"
          label="Текст заявки"
        ></v-textarea>
        <v-btn
          class="mt-4"
          :disabled="!valid"
          :loading="loading"
          @click="submit"
        >
          Оформить заявку
        </v-btn>
        <v-btn class="mt-4" @click="exit"> Отмена </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NewOrder',
  data: () => ({
    valid: false,
  }),
  async fetch({ store }) {
    store.commit('setLoading', true)
    try {
      await store.dispatch('order/getOrderMeta')
    } catch (e) {
    } finally {
      store.commit('setLoading', false)
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    stocks() {
      return this.$store.getters['order/stocks']
    },
    products() {
      return this.$store.getters['order/products']
    },
    note: {
      get() {
        return this.$store.getters['order/note']
      },
      set(value) {
        this.$store.commit('order/setNote', value)
      },
    },
    stock: {
      get() {
        return this.$store.getters['order/stock']
      },
      set(value) {
        this.$store.commit('order/setStock', value)
      },
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('order/createOrder').then(() => {
        this.$router.push('/profile')
        this.$store.dispatch('orders/getOrdersList')
      })
    },
    exit() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
