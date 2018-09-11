import axios from "axios";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      agencies: []
    },
    mutations: {
      changeAgencies(state, agencies) {
        state.agencies = agencies
          .sort((agencyA, agencyB) => {
            return agencyA.weather.currently.cloudCover - agencyB.weather.currently.cloudCover;
          });
      }
    },
    actions: {
      async nuxtServerInit({ commit }) {
        const agencies = await axios.get(
          "http://localhost:8080/",
          { headers: { "Access-Control-Allow-Origin": "*" } }
        ).catch(error => {
          // API is unreachable
          commit("changeAgencies", [])
        });

        // Check if a value was returned by the API
        if (agencies != null) {
          commit("changeAgencies", agencies.data)
        }
      }
    }
  });
};

export default createStore;
