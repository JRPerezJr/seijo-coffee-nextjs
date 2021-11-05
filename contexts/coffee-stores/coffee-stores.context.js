import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState = {
  latLong: '',
  nearbyCoffeeStores: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAT_LONG':
      return { ...state, latLong: action.payload.latLong };
    case 'SET_COFFEE_STORES':
      return {
        ...state,
        nearbyCoffeeStores: action.payload.nearbyCoffeeStores,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
