import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Header, List } from "semantic-ui-react";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((u) => u.id === id));
  if (!user) {
    return null;
  }
  return (
    <>
      {user && (
        <Card>
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Description>
              <Header as="h5">added blogs</Header>
              <List bulleted>
                {user.blogs.map((blog) => (
                  <List.Item key={blog.id}>{blog.title}</List.Item>
                ))}
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default User;
