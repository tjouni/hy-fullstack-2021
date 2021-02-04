import React, { useEffect } from "react";
import BlogDetails from "./components/BlogDetails";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { Container, Header, Menu } from "semantic-ui-react";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogListUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    } else {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    const updateBlogs = async () => {
      dispatch(initializeBlogs());
    };
    const updateUsers = async () => {
      dispatch(initializeUsers());
    };
    updateBlogs();
    updateUsers();
  }, []);

  return (
    <Container>
      <Notification />
      {user ? (
        <>
          <Menu>
            <Menu.Item as={Link} to="/">
              blogs
            </Menu.Item>

            <Menu.Item as={Link} to="/users">
              users
            </Menu.Item>
            <Menu.Item>logged in as {user.name}</Menu.Item>
            <Logout />
          </Menu>
          <Header as="h2">blogs</Header>

          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="new blog">
                <NewBlog />
              </Togglable>
              <Blogs />
            </Route>
          </Switch>
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default App;
