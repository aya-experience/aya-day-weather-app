import axios from "axios";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      agencies: []
    },
    mutations: {
      changeAgencies(state, agencies) {
        state.agencies = agencies;
      }
    },
    actions: {
      async nuxtServerInit({ commit }) {
        const agencies = await axios.get(
          "https://aya-day-weather-proxy-cunrbalftb.now.sh/",
          { headers: { "Access-Control-Allow-Origin": "*" } }
        );
        commit("changeAgencies", agencies.data);
      }
    }
  });
};

export default createStore;
