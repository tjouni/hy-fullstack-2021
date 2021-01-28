import React from "react";
import { connect } from "react-redux";
import { incrementVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, incrementVotes, setNotification }) => {
  // const dispatch = useDispatch();
  // const vote = (anecdote) => {
  //   dispatch(
  //     setNotification(`you voted for anecdote "${anecdote.content}"`, 10)
  //   );
  //   dispatch(incrementVotes(anecdote.id));
  // };
  const vote = () => {
    setNotification(`you voted for anecdote "${anecdote.content}"`, 10);
    incrementVotes(anecdote.id);
  };
  return (
    <>
      <div>"{anecdote.content}"</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  );
};

const AnecdoteList = ({ anecdotes, incrementVotes, setNotification }) => {
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.filter((a) => a.content.includes(state.filter))
  // );
  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          incrementVotes={incrementVotes}
          setNotification={setNotification}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)),
  };
};

export default connect(mapStateToProps, { incrementVotes, setNotification })(
  AnecdoteList
);
