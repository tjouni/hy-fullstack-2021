import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

const Blog = ({ blog }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header as={Link} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Card.Header>
        <Card.Meta>{blog.author}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
