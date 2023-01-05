<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>Список заявок</h1>
      <v-btn class="mb-2" @click="addItem">Новая заявка</v-btn>
      <v-checkbox
        v-model="archive"
        label="Показывать архив"
        @click="showArchive()"
      ></v-checkbox>
      <v-data-table
        :headers="headers"
        :items="orders"
        sort-by="date"
        sort-desc
        class="elevation-1"
      >
        <template #item.date="{ item }">
          {{ new Date(item.date).toLocaleString() }}
        </template>
        <template #item.actions="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
          <v-icon
            v-if="item.canChange"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="item.canDelete"
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Profile',
  middleware: ['auth'],
  data: () => ({
    headers: [
      {
        text: 'Заявка',
        align: 'start',
        sortable: false,
        value: 'note',
        width: '65%',
      },
      { text: 'Дата', value: 'date' },
      { text: 'Статус', value: 'status' },
      { text: 'Сотрудник', value: 'name' },
      {
        text: 'Действия',
        value: 'actions',
        sortable: false,
        align: 'end',
      },
    ],
  }),
  async fetch({ store }) {
    store.commit('setLoading', true)
    try {
      if (store.getters['orders/ordersList'].length === 0) {
        await store.dispatch('orders/getOrdersList')
      }
    } catch (e) {
      console.log(e)
    } finally {
      store.commit('setLoading', false)
    }
  },
  computed: {
    orders() {
      return this.$store.getters['orders/ordersList']
    },
    archive: {
      get() {
        return this.$store.getters['orders/archive']
      },
      set(value) {
        this.$store.commit('orders/setArchive', value)
      },
    },
  },
  methods: {
    editItem(item) {
      this.$router.push(`profile/order/${item.uuid}`)
    },
    viewItem(item) {
      this.$router.push(`profile/order/${item.uuid}`)
    },
    deleteItem(item) {
      this.$store.commit('setLoading', true)
      this.$store.dispatch('order/deleteOrder', item.uuid).then(() => {
        this.$store.dispatch('orders/getOrdersList')
        this.$store.commit('setLoading', false)
      })
    },
    prev() {
      this.$store.dispatch('orders/getOrdersList', 'prev')
    },
    showArchive() {
      this.$store.dispatch('orders/getOrdersList', 'archive')
    },
    next() {
      this.$store.dispatch('orders/getOrdersList', 'next')
    },
    addItem() {
      this.$store.commit('order/clearOrder')
      this.$router.push('/profile/order/new')
    },
  },
}
</script>

<style scoped></style>
