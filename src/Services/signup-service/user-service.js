import { myaxios } from "../helper";
export const signup = (user) => {
  return myaxios.post("/auth/addUser", user).then((response) => response.data);
};
export const loginUser = (loginDetail) => {
  return myaxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};
