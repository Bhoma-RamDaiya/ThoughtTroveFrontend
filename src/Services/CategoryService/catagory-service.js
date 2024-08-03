import { myaxios } from "../helper";

export const loadAllCatagories = () => {
  return myaxios.get(`/category/get-all-category`).then((reponse) => {
    return reponse.data;
  });
};
