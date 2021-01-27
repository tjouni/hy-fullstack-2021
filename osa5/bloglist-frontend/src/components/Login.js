import React from "react";

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>{" "}
      <form data-testid="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username-field"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password-field"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button data-testid="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
