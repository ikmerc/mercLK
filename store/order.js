export const state = () => ({
  order: {},
  stocks: [],
  comments: [],
  stock: null,
  note: '',
  products: [],
  selected: [],
  comment: '',
})

export const mutations = {
  setStocks(state, stocks) {
    state.stocks = stocks
  },
  setStock(state, stock) {
    state.stock = stock
  },
  setNote(state, note) {
    state.note = note
  },
  setComment(state, comment) {
    state.comment = comment
  },
  setProducts(state, products) {
    state.products = products
  },
  setComments(state, comments) {
    state.comments = comments
  },
  pushSelected(state, selected) {
    selected.forEach((val) => {
      state.products.push(val)
    })
  },
  clearOrder(state) {
    state.order = {}
    state.products = []
    state.selected = []
    state.comments = []
  },
  deleteProduct(state, item) {
    state.products.splice(state.products.indexOf(item), 1)
  },
  setOrder(state, order) {
    if (order.length !== 0) {
      state.order = order[0]
      state.products = order[0].products
      state.comments = order[0].comments
    }
  },
  setOrderStock(state, stock) {
    state.order.stock = stock
  },
}

export const actions = {
  async getOrderMeta({ commit }) {
    try {
      const { errors, meta } = await this.$axios.$get('/v1/meta')
      commit('setStocks', meta.stock)
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async createOrder({ commit, getters }) {
    try {
      const newOrder = {
        note: getters.note,
      }
      const { errors } = await this.$axios.$post('/v1/orders', newOrder)
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      } else {
        commit('setMessage', 'Заявка успешно создана', { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addComment({ commit, getters }) {
    try {
      const newOrder = {
        comment: getters.comment,
        uuid: getters.order.uuid,
      }
      const { errors } = await this.$axios.$post('/v1/orders', newOrder)
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      } else {
        commit('setComment', '')
        commit('setMessage', 'Комментарий добавлен', { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async deleteOrder({ commit }, uuid) {
    try {
      const { errors } = await this.$axios.$delete(`/v1/orders?order=${uuid}`)
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      } else {
        commit('setMessage', 'Заказ успешно удален', { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async getOrderDetail({ commit }, uuid) {
    try {
      const { errors, results, meta } = await this.$axios.$get(
        `/v1/orders?order=${uuid}`
      )
      commit('setOrder', results)
      commit('setStocks', meta.stock)
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateOrder({ commit, getters }) {
    try {
      const order = getters.order
      const { errors } = await this.$axios.$put(
        `/v1/orders?order=${order.uuid}`,
        order
      )
      if (errors.exist) {
        commit('setError', errors.title, { root: true })
      } else {
        commit('setMessage', 'Заказ успешно обновлен', { root: true })
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
}

export const getters = {
  order: (state) => state.order,
  note: (state) => state.note,
  stocks: (state) => state.stocks,
  products: (state) => state.products,
  stock: (state) => state.stock,
  selected: (state) => state.selected,
  orderStock: (state) => state.order.stock,
  comments: (state) => state.comments,
  comment: (state) => state.comment,
}
