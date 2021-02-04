import React, { useState } from "react";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Header, Form, Button } from "semantic-ui-react";

const NewBlog = () => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });
  const newBlogHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(addBlog(newBlog));
    } catch (error) {
      dispatch(setNotification(error));
    }
    setNewBlog({ author: "", title: "", url: "" });
  };
  return (
    <>
      <Header as="h2">Create new</Header>
      <Form onSubmit={newBlogHandler}>
        <Form.Input
          label="title"
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />

        <Form.Input
          label="author"
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
        <Form.Input
          label="url"
          data-testid="url-field"
          type="text"
          value={newBlog.url}
          name="URL"
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />

        <Button type="submit">create</Button>
      </Form>
    </>
  );
};

export default NewBlog;
