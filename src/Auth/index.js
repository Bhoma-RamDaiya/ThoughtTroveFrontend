//isLogedIn

export const isLogedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};
// doLogin where we are storing the data and user as well
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};
export const doLogOut = (next) => {
  localStorage.removeItem("data");
  next();
};

//getCurrentuser
export const getCurrentuser = () => {
  if (isLogedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else return undefined;
};
export const getToken = () => {
  if (isLogedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else return undefined;
};
