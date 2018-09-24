import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      agencies: [],
      error: '',
    },
    mutations: {
      changeAgencies(state, agencies) {
        state.agencies = agencies.sort((agencyA, agencyB) => {
          return agencyA.weather.currently.cloudCover - agencyB.weather.currently.cloudCover;
        });
      },
      setError(state, error) {
        state.error = error;
      },
    },
    getters: {
      error: (state) => {
        return state.error;
      },
    },
  });
};

export default createStore;
