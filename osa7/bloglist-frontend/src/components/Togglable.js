import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);
  return visible ? (
    <Button onClick={toggleVisibility}>{buttonLabel}</Button>
  ) : (
    <>
      {children}
      <Button onClick={toggleVisibility}>hide form</Button>
    </>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
