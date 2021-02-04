export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION",
  };
};

export const setNotification = (message, timeout = 5) => {
  return (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(removeNotification()),
      timeout * 1000
    );
    dispatch({
      type: "SET_NOTIFICATION",
      data: { message, timeoutId },
    });
  };
};

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      state.timeoutId && window.clearTimeout(state.timeoutId);
      return action.data;
    case "REMOVE_NOTIFICATION":
      return { message: null };
    default:
      return state;
  }
};

export default notificationReducer;
