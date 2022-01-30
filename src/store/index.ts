import {
  createStore,
  Store as VuexStore,
  CommitOptions,
} from 'vuex';

import VuexPersistence from 'vuex-persist';

import { State, state } from './state';
import { Mutations, mutations } from './mutations';
import { Getters, getters } from './getters';

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
});

export const store = createStore<State>({
  state,
  mutations,
  getters,
  plugins: [vuexLocal.plugin],
});

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
};

export function useStore() {
  return store as Store;
}
