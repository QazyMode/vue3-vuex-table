import { GetterTree } from 'vuex';
import { State, ProductItem } from './state';

export type Getters = {
  products(state: State): ProductItem[]
  totalSum(state: State): number
}

export const getters: GetterTree<State, State> & Getters = {
  products(state) {
    return state.products;
  },
  totalSum(state) {
    return state.products.reduce((total: number, { sum }) => {
      let result = total;
      result += sum;
      return result;
    }, 0);
  },
};
