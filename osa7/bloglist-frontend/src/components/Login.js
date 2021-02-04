import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Container, Header, Form, Button } from "semantic-ui-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      dispatch(logIn(username, password));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification("Wrong username or password"));
    }
  };
  return (
    <Container>
      <Header as="h2">Login</Header>
      <Form onSubmit={loginHandler}>
        <Form.Input
          label="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Input
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button type="submit" loading={isLoading}>
          login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
