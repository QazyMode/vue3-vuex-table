export type ProductItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  sum: number;
};

export type State = {
  products: ProductItem[],
}

export const state: State = {
  products: [],
};
