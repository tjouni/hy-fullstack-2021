import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const AnecdoteForm = ({ filter, setFilter }) => {
  // const dispatch = useDispatch();
  // const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    //dispatch(
    setFilter(event.target.value);
    //);
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} value={filter} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setFilter })(AnecdoteForm);
