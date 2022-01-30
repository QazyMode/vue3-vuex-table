import { MutationTree } from 'vuex';
import { State, ProductItem } from './state';

export enum MutationType {
  AddProduct = 'ADD_PRODUCT',
  DeleteProducts = 'DELETE_PRODUCTS',
}

export type Mutations = {
  [MutationType.AddProduct](state: State, product: ProductItem): void,
  [MutationType.DeleteProducts](state: State, ids: number[]): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.AddProduct](state, product) {
    const ids: number[] = state.products.map(({ id }) => id);
    const newItemId = ids.length > 0 ? Math.max(...ids) + 1 : 0;

    const newProduct = {
      ...product,
      sum: product.price * product.qty,
      id: newItemId,
    };

    state.products.push(newProduct);
  },
  [MutationType.DeleteProducts](state, ids) {
    ids.forEach((item) => {
      const itemIndex = state.products.findIndex(({ id }) => id === item);
      state.products.splice(itemIndex, 1);
    });
  },
};
