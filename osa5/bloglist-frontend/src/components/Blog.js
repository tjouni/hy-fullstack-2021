import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, removeBlog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const buttonLabel = showDetails ? "hide" : "view";
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div data-testid="blog" data-cy={blog.title} style={blogStyle}>
      <p>
        <span data-testid="title-text">{blog.title}</span>{" "}
        <span data-testid="author-text">{blog.author}</span>
      </p>
      <button
        data-testid="view-button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {buttonLabel}
      </button>
      {showDetails && (
        <div>
          <p data-testid="url-text">{blog.url}</p>
          <p>
            {" "}
            <span data-testid="likes-text">likes {blog.likes}</span>{" "}
            <button data-testid="like-button" onClick={() => likeBlog(blog)}>
              like
            </button>
          </p>
          <p>
            <span data-testid="user-text">{blog.user && blog.user.name} </span>
            {blog.user && blog.user.username === currentUser.username && (
              <button
                data-testid="remove-button"
                onClick={() => removeBlog(blog)}
              >
                remove
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default Blog;
