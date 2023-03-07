import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCartItems } from "./localStorage";
import Reducer, { initialState } from "./reducer";

export const Context = createContext(null);
export const useData = () => useContext(Context);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { user } = state;

  useEffect(() => {
    if (user) {
      const cartItems = getCartItems(user.id) || [];
      dispatch({ type: "SET_CART", payload: cartItems });
    }
  }, [user]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Store;
