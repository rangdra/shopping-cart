import { createContext, ReactNode, useReducer, useContext } from 'react';
import faker from 'faker';
import {
  CartDispatch,
  FilterDispatch,
  FilterState,
  Product,
  State,
} from '../types';
import { cartReducer, filterReducer } from './reducers';

const GlobalContext = createContext<
  | {
      state: State;
      cartDispatch: CartDispatch;
      filterState: FilterState;
      filterDispatch: FilterDispatch;
    }
  | undefined
>(undefined);
faker.seed(99);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const products: Product[] = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()) * 1000,
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, cartDispatch] = useReducer(cartReducer, {
    products,
    cart: [],
    wishlist: [],
  });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: '',
    sort: '',
  });

  const value = { state, cartDispatch, filterState, filterDispatch };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
export { GlobalProvider, useGlobalContext };
