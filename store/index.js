import axios from 'axios';
import Vuex from 'vuex';

// localhost URL in dev otherwise prod URL
const API_URL = process.env.isDev ? process.env.baseUrl_dev : process.env.baseUrl;

const createStore = () => {
  return new Vuex.Store({
    state: {
      agencies: [],
      error: ''
    },
    mutations: {
      changeAgencies(state, agencies) {
        state.agencies = agencies.sort((agencyA, agencyB) => {
          return agencyA.weather.currently.cloudCover - agencyB.weather.currently.cloudCover;
        });
      },
      setError(state, error) {
        state.error = error;
      }
    },
    actions: {
      async nuxtServerInit({ commit }) {
        const agencies = await axios
          .get(API_URL, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          })
          .catch(error => {
            // API is unreachable, set the error message we received
            commit('setError', error.message);
          });

        // Check if data was returned by the API
        if (agencies != null) {
          // Save it
          commit('changeAgencies', agencies.data);
        }
      }
    },
    getters: {
      error: state => state.error
    }
  });
};

export default createStore;
