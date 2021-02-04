import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../reducers/userReducer";
import { Button } from "semantic-ui-react";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogListUser");
    dispatch(logOut());
  };
  return (
    <>
      <Button onClick={logoutHandler}>log out</Button>
    </>
  );
};

export default Logout;
