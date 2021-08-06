import {
  CartAction,
  FilterAction,
  FilterState,
  Product,
  State,
} from '../types';

export const cartReducer = (state: State, action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c: Product) => c.id !== action.payload.id),
      };
    case 'CHANGE_CART_QTY':
      return {
        ...state,
        cart: state.cart.filter((c: Product) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (c: Product) => c.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, sort: action.payload };
    case 'FILTER_BY_STOCK':
      return { ...state, byStock: !state.byStock };
    case 'FILTER_BY_DELIVERY':
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case 'FILTER_BY_RATING':
      return { ...state, byRating: action.payload };
    case 'FILTER_BY_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'CLEAR_FILTERS':
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: '',
      };

    default:
      return state;
  }
};
