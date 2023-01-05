<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row>
        <v-col>
          <v-text-field
            :value="order.num"
            label="Номер заявки"
            disabled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :value="order.date"
            label="Дата заявки"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            :value="order.note"
            label="Текст заявки"
            disabled
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="comments"
            class="elevation-1 mb-2"
            hide-default-footer
          >
          </v-data-table>
        </v-col>
      </v-row>
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col>
            <v-form ref="form" v-model="valid" class="mr-8">
              <v-row>
                <v-col class="mr-8">
                  <v-textarea
                    v-model="comment"
                    solo
                    aria-required="true"
                    name="comment"
                    :rules="[
                      (v) =>
                        (v || '').length > 20 ||
                        'Текст комментария должен быть длиннее 20 символов',
                    ]"
                    label="Ваш комментарий"
                  ></v-textarea>
                </v-col>
                <v-col class="mr-4">
                  <v-btn
                    class="mt-4"
                    :disabled="!valid"
                    :loading="loading"
                    @click="submit"
                  >
                    + комментарий
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col>
          <v-btn class="mr-4" @click="goBack"> Назад </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProfileOrder',
  data: () => ({
    valid: false,
    headers: [
      { text: 'Комментарий', value: 'comment', width: '70%' },
      { text: 'Автор', value: 'author' },
      { text: 'Дата', value: 'date' },
    ],
  }),
  async fetch({ store, params }) {
    store.commit('setLoading', true)
    try {
      if (store.getters['order/products'].length === 0) {
        await store.dispatch('order/getOrderDetail', params.uuid)
      }
    } catch (e) {
    } finally {
      store.commit('setLoading', false)
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    order() {
      return this.$store.getters['order/order']
    },
    comment: {
      get() {
        return this.$store.getters['order/comment']
      },
      set(value) {
        this.$store.commit('order/setComment', value)
      },
    },
    stock: {
      get() {
        return this.$store.getters['order/orderStock']
      },
      set(value) {
        this.$store.commit('order/setOrderStock', value)
      },
    },
    stocks() {
      return this.$store.getters['order/stocks']
    },
    comments() {
      return this.$store.getters['order/comments']
    },
    products() {
      return this.$store.getters['order/products']
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('order/addComment').then(() => {
        this.$router.go()
      })
    },
    goBack() {
      this.$router.replace('/profile')
    },
    deleteItem(item) {
      this.$store.commit('order/deleteProduct', item)
    },
  },
}
</script>

<style scoped></style>
