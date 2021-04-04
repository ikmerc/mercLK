export const state = () => ({
  loading: false,
  error: false,
  message: null,
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = true
    state.message = payload
  },
  setMessage(state, payload) {
    state.error = false
    state.message = payload
  },
  clearMessage(state) {
    state.error = false
    state.message = null
  },
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('auth/autoLogin')
  },
}

export const getters = {
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
  message(state) {
    return state.message
  },
}
