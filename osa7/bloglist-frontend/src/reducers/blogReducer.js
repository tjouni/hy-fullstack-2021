import _ from "lodash";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";

export const incrementLikes = (id) => {
  return async (dispatch) => {
    await blogService.incrementLikes(id);
    dispatch({ type: "INCREMENT_LIKES", data: { id } });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    dispatch(
      setNotification(
        `Successfully added new blog ${blog.title} by ${blog.author}`
      )
    );
    dispatch({
      type: "ADD_BLOG",
      data: response,
    });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment);
    dispatch({
      type: "ADD_COMMENT",
      data: { id, comment },
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "INITIALIZE_BLOGS", data: blogs });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: "REMOVE_BLOG", data: { id } });
    dispatch(setNotification("Successfully removed blog"));
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INCREMENT_LIKES": {
      const id = action.data.id;
      const blog = state.find((b) => b.id === id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      return _.orderBy(
        state.map((original) => (original.id !== id ? original : updatedBlog)),
        "likes",
        "desc"
      );
    }
    case "REMOVE_BLOG": {
      const id = action.data.id;
      return _.orderBy(
        state.filter((blog) => blog.id !== id),
        "likes",
        "desc"
      );
    }
    case "ADD_BLOG":
      return _.orderBy(state.concat(action.data), "likes", "desc");
    case "ADD_COMMENT": {
      const { id, comment } = action.data;
      const blog = state.find((b) => b.id === id);
      const updatedBlog = { ...blog, comments: blog.comments.concat(comment) };
      return _.orderBy(
        state.map((original) => (original.id !== id ? original : updatedBlog)),
        "likes",
        "desc"
      );
    }
    case "INITIALIZE_BLOGS":
      return _.orderBy(action.data, "likes", "desc");
    default:
      return state;
  }
};

export default blogReducer;
