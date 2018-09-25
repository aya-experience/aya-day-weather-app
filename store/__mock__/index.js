import Vue from 'vue'; // eslint-disable-line
import Vuex from 'vuex'; // eslint-disable-line

Vue.use(Vuex);

export const getters = {
  error: jest.fn().mockReturnValue('Error message'),
};

export const mutations = {
  changeAgencies: jest.fn(),
  setError: jest.fn(),
};

export const state = {
  agencies: [
    {
      name: 'Nantes',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Rennes',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Montréal',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Paris',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Singapour',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Lyon',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Lille',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Grenoble',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
    {
      name: 'Bordeaux',
      weather: {
        currently: {
          temperature: 0,
          icon: 'snow',
        },
        daily: {
          data: [
            {
              temperatureHigh: 0,
              temperatureLow: 0,
            },
          ],
        },
      },
    },
  ],
  error: '',
};

export function createMocks(
  custom = {
    getters: {},
    mutations: {},
    actions: {},
    state: {},
  },
) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockState = Object.assign({}, state, custom.state);

  return {
    getters: mockGetters,
    mutations: mockMutations,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      state: mockState,
    }),
  };
}

export const { store } = createMocks();
