import { SET_USER, SET_ROLE, USER_LOADING, SET_CART } from "./actions";
import { getCurrentUser } from "./localStorage";

export const initialState = {
  user: getCurrentUser() || null,
  userLoading: false,
  token: localStorage.getItem("token"),
  cart: null,
  role: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

export default Reducer;
