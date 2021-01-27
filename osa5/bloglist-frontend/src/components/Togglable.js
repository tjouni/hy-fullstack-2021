import React, { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  return visible ? (
    <div>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
    </div>
  ) : (
    <div>
      {children}
      <button onClick={toggleVisibility}>hide</button>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
