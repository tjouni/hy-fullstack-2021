import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ setNotification, addAnecdote }) => {
  //const dispatch = useDispatch();
  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    //dispatch(
    setNotification(`you added anecdote "${content}"`, 10);
    //);
    //dispatch(
    addAnecdote(content);
    //);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(() => {}, { setNotification, addAnecdote })(
  AnecdoteForm
);
