import _ from "lodash";
import { getAll } from "../services/users";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAll();
    dispatch({ type: "INITIALIZE_USERS", data: users });
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_USERS":
      return _.orderBy(action.data, "name", "asc");
    default:
      return state;
  }
};

export default usersReducer;
