import Vuex from 'vuex'; // eslint-disable-line

const createStore = () =>
  new Vuex.Store({
    state: {
      agencies: [],
      error: '',
    },
    mutations: {
      changeAgencies(state, agencies) {
        state.agencies = agencies.sort(
          (agencyA, agencyB) =>
            agencyA.weather.currently.cloudCover - agencyB.weather.currently.cloudCover,
        );
      },
      setError(state, error) {
        state.error = error;
      },
    },
    getters: {
      error: state => state.error,
    },
    actions: {
      async getAgencies({ commit }) {
        const agencies = await this.$axios
          .$get('/', {
            headers: { 'Access-Control-Allow-Origin': '*' },
          })
          .catch(error => {
            commit('setError', error.message);
          });

        if (agencies !== null && typeof agencies !== 'undefined') {
          commit('changeAgencies', agencies);
        }
      },
    },
  });

export default createStore;
