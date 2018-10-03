import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMocks as createStoreMocks } from '../../store/__mock__/index';
import NuxtLink from '../../.nuxt/components/nuxt-link';
import Agency from '../../pages/agencies/_agency.vue';

// Unit tests for _agency.vue

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

Agency.components.NuxtLink = NuxtLink;

describe('[UNIT] Agency.test.js', () => {
  let storeMock;
  let wrapper;
  let $route;

  beforeEach(() => {
    storeMock = createStoreMocks();
    $route = {
      name: '/agencies',
      params: {
        agency: 'Paris',
      },
    };
    wrapper = shallowMount(Agency, {
      store: storeMock.store,
      localVue,
      mocks: {
        $route,
      },
      methods: {
        toCelcius(f) {
          return Math.round((f - 32) / 1.8);
        },
      },
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('contains a weather icon', () => {
    expect(wrapper.contains('.weather')).toBe(true);
  });

  it('gets the correct city name', () => {
    expect(wrapper.find('h1').text()).toBe('Paris');
  });

  it('gets a temperature', () => {
    const tempStr = wrapper.find('h2').text();
    const tempNum = parseInt(tempStr.substring(0, tempStr.length - 1), 10);
    expect(tempNum).toBeDefined();
  });

  it('should return a valid temperature after conversion', () => {
    expect(wrapper.vm.toCelcius(32)).toBe(0);
  });

  it('should return a valid agency when calling agency method', () => {
    expect(wrapper.vm.agency.name).toBe('Paris');
  });

  it('should return a valid next url', () => {
    expect(wrapper.vm.nextUrl).toBe('/agencies/Singapour');
  });

  it('should return a valid previous url', () => {
    expect(wrapper.vm.previousUrl).toBe('/agencies/Montréal');
  });
});
