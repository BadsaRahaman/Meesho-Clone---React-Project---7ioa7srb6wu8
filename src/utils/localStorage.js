import { STORAGE_NAME, CURRENT_USER, CART_ITEMS } from "./constants";
import { nanoid } from "nanoid";

export const getAllUsers = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_NAME));
  return users;
};

export const getCurrentUser = () => {
  const users = JSON.parse(localStorage.getItem(CURRENT_USER));
  return users;
};
export const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER);
};

export const getSingleUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const user = users?.filter(
    (user) => user.email == email && user.password == password
  );
  if (user?.length !== 0 && user) {
    const tempuser = {
      name: user[0].name,
      email: user[0].email,
      id: user[0].id,
    };
    localStorage.setItem(CURRENT_USER, JSON.stringify(tempuser));
    return tempuser;
  }
  return false;
};

export const createUser = ({ name, email, mobile, password }) => {
  const userId = `${nanoid()}${nanoid()}`;
  const data = { name, email, mobile, password, id: userId };
  const isUserAlreadyExist = getSingleUser({ email, password });
  if (isUserAlreadyExist) {
    return false;
  }
  const users = getAllUsers();
  if (users) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([...users, data]));
  } else {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([data]));
  }
  localStorage.setItem(
    CURRENT_USER,
    JSON.stringify({ name, email, id: userId })
  );
  return { name, email, id: userId };
};

export const getCartItems = (userId) => {
  if (!userId) return null;
  const carts = JSON.parse(localStorage.getItem(CART_ITEMS));
  if (!carts || Object.keys(carts).length === 0) {
    return null;
  }
  if (carts[userId] === undefined) {
    return null;
  } else return carts[userId];
};

export const addToCart = (userId, product) => {
  if (!userId || !product) return false;
  let carts = JSON.parse(localStorage.getItem(CART_ITEMS));
  if (!carts) {
    carts = {};
  }
  const userCart = getCartItems(userId);
  let newUserCart = {};
  if (!userCart) {
    carts = { ...carts, [userId]: [product] };
  } else {
    carts = { ...carts, [userId]: [...userCart, product] };
  }
  localStorage.setItem(CART_ITEMS, JSON.stringify(carts));
  return true;
};

export const removeProductFromCart = (userId, productId) => {
  let carts = JSON.parse(localStorage.getItem(CART_ITEMS));
  let cartItems = getCartItems(userId);
  let newProducts = cartItems.filter((product) => product.id != productId);
  const newCart = { ...carts, [userId]: [...newProducts] };
  localStorage.setItem(CART_ITEMS, JSON.stringify(newCart));
  return true;
};
