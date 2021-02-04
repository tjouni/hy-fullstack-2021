import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Card } from "semantic-ui-react";

const Users = () => {
  const users = useSelector((state) => state.users);
  if (!users) {
    return null;
  }
  return (
    <>
      <Header as="h2">Users</Header>
      <Card.Group>
        {users.map((user) => (
          <Card key={user.id}>
            <Card.Content>
              <Card.Header as={Link} to={`/users/${user.id}`}>
                {user.name}
              </Card.Header>
              <Card.Meta>Blogs created: {user.blogs.length}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
};

export default Users;
