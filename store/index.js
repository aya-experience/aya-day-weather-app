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
  });

export default createStore;
