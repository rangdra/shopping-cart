import { RefObject } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  qty?: number;
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload?: any }
  | { type: 'REMOVE_FROM_CART'; payload?: any }
  | { type: 'CHANGE_CART_QTY'; payload?: any }
  | { type: 'ADD_TO_WISHLIST'; payload?: any }
  | { type: 'REMOVE_FROM_WISHLIST'; payload?: any };

export type CartDispatch = (action: CartAction) => void;
export interface State {
  products: Product[];
  cart: Product[];
  wishlist: Product[];
}

export interface FilterState {
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number;
  searchQuery: string;
  sort: string;
}
export type FilterAction =
  | { type: 'SORT_BY_PRICE'; payload?: any }
  | { type: 'FILTER_BY_STOCK'; payload?: any }
  | { type: 'FILTER_BY_DELIVERY'; payload?: any }
  | { type: 'FILTER_BY_RATING'; payload?: any }
  | { type: 'FILTER_BY_SEARCH'; payload?: any }
  | { type: 'CLEAR_FILTERS'; payload?: any };

export type FilterDispatch = (action: FilterAction) => void;

export interface IRefProps {
  refShowProduct?: RefObject<HTMLDivElement | null>;
}
