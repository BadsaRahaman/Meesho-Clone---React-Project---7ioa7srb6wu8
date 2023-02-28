import { STORAGE_NAME } from "./constants";

export const getSingleUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const user = users.filter(
    (user) => user.email == email && user.password == password
  );
  if (user.length !== 0) {
    return user[0];
  }
  return false;
};

export const getAllUsers = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_NAME));
  return users;
};

export const createUser = ({ name, email, mobile, password }) => {
  const data = { name, email, mobile, password };
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
  return { name, email };
};
