import React, { useEffect } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import { Card } from "semantic-ui-react";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateBlogs = async () => {
      dispatch(initializeBlogs());
    };
    updateBlogs();
  }, []);
  if (!blogs) {
    return null;
  }
  return (
    <Card.Group>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Card.Group>
  );
};

export default Blogs;
