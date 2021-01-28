import _ from "lodash";
import anecdoteService from "../services/anecdotes";

export const incrementVotes = (id) => {
  return async (dispatch) => {
    const data = await anecdoteService.vote(id);
    dispatch({
      type: "INCREMENT_VOTES",
      data,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: "INITIALIZE_ANECDOTES",
      data,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INCREMENT_VOTES":
      const id = action.data.id;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return _.orderBy(
        state.map((original) =>
          original.id !== id ? original : updatedAnecdote
        ),
        "votes",
        "desc"
      );
    case "ADD_ANECDOTE":
      return _.orderBy(state.concat(action.data), "votes", "desc");
    case "INITIALIZE_ANECDOTES":
      return _.orderBy(action.data, "votes", "desc");
    default:
      return state;
  }
};

export default anecdoteReducer;
