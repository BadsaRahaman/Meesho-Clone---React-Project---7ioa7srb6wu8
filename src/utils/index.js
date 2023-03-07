import { SET_USER, SET_ROLE, USER_LOADING } from "./actions";
import { STORAGE_NAME } from "./constants";
import Layout from "./Layout";
import { getSingleUser, getAllUsers, createUser } from "./localStorage";
import Reducer from "./reducer";
import { useData } from "./Store";
import { useProducts } from "./useProducts";
import { useSingleProduct } from "./useSingleProduct";

const utils = {
  SET_USER,
  SET_ROLE,
  USER_LOADING,
  STORAGE_NAME,
  Layout,
  getSingleUser,
  getAllUsers,
  createUser,
  Reducer,
  useData,
  useProducts,
  useSingleProduct,
};
export default utils;
