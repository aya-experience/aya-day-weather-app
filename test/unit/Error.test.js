import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMocks as createStoreMocks } from '../../store/__mock__/index';
import Error from '../../pages/error.vue';

jest.mock('../../store');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('[UNIT] Error.test.js', () => {
  let storeMock;
  let wrapper;

  beforeEach(() => {
    storeMock = createStoreMocks();
    wrapper = shallowMount(Error, {
      store: storeMock.store,
    });
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('gets the correct error message from the store', () => {
    expect(
      wrapper
        .find('span')
        .text()
        .trim(),
    ).toEqual('Error message');
  });
});
