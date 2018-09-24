import axios from 'axios';
import Vuex from 'vuex';

// localhost URL in dev otherwise prod URL
const API_URL = process.env.isDev ? process.env.baseUrl_dev : process.env.baseUrl;

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
