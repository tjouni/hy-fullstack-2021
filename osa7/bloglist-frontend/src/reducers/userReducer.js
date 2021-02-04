import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

export const logIn = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("blogListUser", JSON.stringify(user));
    dispatch(setNotification(`Successfully logged in as ${user.username}`));
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data;
    case "LOG_OUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
