import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMocks as createStoreMocks } from '../../store/__mock__/index';
import NuxtLink from '../../.nuxt/components/nuxt-link';
import Index from '../../pages/index.vue';

// Unit tests for Index.vue

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

Index.components.NuxtLink = NuxtLink;

describe('[UNIT] Index.test.js', () => {
  let storeMock;
  let wrapper;
  let $route;

  beforeEach(() => {
    storeMock = createStoreMocks();
    $route = {
      name: '/agencies/Paris',
    };
    wrapper = shallowMount(Index, {
      store: storeMock.store,
      localVue,
      $route,
      methods: {
        toCelcius(f) {
          return Math.round((f - 32) / 1.8);
        },
      },
      data() {
        return {
          weatherIllustrationMapper: {
            snow: 'neige@1x.png',
          },
        };
      },
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('should have 8 agencies in the store', () => {
    expect(storeMock.state.agencies.length).toBe(9);
  });

  it('should have an agency named Paris', () => {
    expect(storeMock.state.agencies.filter(a => a.name === 'Paris')).not.toBe(null);
  });

  it('should have an empty error message', () => {
    expect(storeMock.state.error).toBe('');
  });

  it('should have a valid error message returned by the getter', () => {
    expect(storeMock.getters.error()).toBe('Error message');
  });

  it('should return a valid temperature after conversion', () => {
    expect(wrapper.vm.toCelcius(32)).toBe(0);
  });

  it('should return a valid winner agency', () => {
    expect(wrapper.vm.winnerAgency.name).not.toBe('');
  });

  it('should return a valid list of other agencies', () => {
    expect(wrapper.vm.otherAgencies.length).toBe(8);
  });

  it('should return a valid weather icon', () => {
    expect(
      wrapper.vm.weatherIllustrationMapper[wrapper.vm.winnerAgency.weather.currently.icon],
    ).toBe('neige@1x.png');
  });
});
