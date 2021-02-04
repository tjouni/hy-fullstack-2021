import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addComment,
  incrementLikes,
  removeBlog,
} from "../reducers/blogReducer";
import { Card, Comment, Form, Header, Icon, Button } from "semantic-ui-react";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  if (!blog) {
    return null;
  }
  const commentHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(addComment(blog.id, newComment));
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header as="h3">comments</Header>
      <Comment.Group>
        {blog.comments.map((comment, index) => (
          <Comment key={index}>
            <Comment.Content>{comment}</Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      <Form onSubmit={commentHandler}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <Button type="submit">add comment</Button>
      </Form>
    </>
  );
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  if (!blog) {
    return null;
  }

  const likeHandler = async (blog) => {
    dispatch(incrementLikes(blog.id));
  };
  const removeHandler = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
      history.push("/");
    }
  };
  const link = blog.url.indexOf("://") === -1 ? "http://" + blog.url : blog.url;
  return (
    <Card>
      <Card.Header as="h2">{blog.title}</Card.Header>
      <Card.Meta>{blog.author}</Card.Meta>
      <Card.Meta>
        <a href={link}>{link}</a>
      </Card.Meta>
      <Card.Content>
        <span>{blog.user && `added by ${blog.user.name}`} </span>
        {blog.user && blog.user.username === currentUser.username && (
          <Form>
            <Button onClick={() => removeHandler(blog)}>remove</Button>
          </Form>
        )}
        <Comments blog={blog} />
      </Card.Content>

      <Card.Content extra>
        <Icon
          name="thumbs up outline"
          size="small"
          link="true"
          onClick={() => likeHandler(blog)}
        />
        {blog.likes}
      </Card.Content>
    </Card>
  );
};

export default BlogDetails;
