import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const localStorageKey = "blogListUser";

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  return <div>{String(notification.message)}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: null }), 5000);
  };
  const logoutHandler = (event) => {
    event.preventDefault();
    window.localStorage.removeItem(localStorageKey);
    setUser(null);
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem(localStorageKey, JSON.stringify(user));
      notify("success", `Successfully logged in as ${user.username}`);
    } catch (error) {
      notify("error", "Wrong username or password");
    }
  };
  const likeBlog = async (blog) => {
    const updatedBlog = await blogService.incrementLikes(blog.id);
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
  };
  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      notify("success", "Successfully removed blog");
    }
  };
  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      notify(
        "success",
        `Successfully added new blog ${newBlog.title} by ${newBlog.author}`
      );
    } catch (error) {
      notify("error", error);
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <Login
          handleLogin={loginHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>logged in as {user.name}</p>
          <button onClick={logoutHandler}>log out</button>
          <h2>blogs</h2>
          <Togglable buttonLabel="new blog">
            <NewBlog createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
                currentUser={user}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
