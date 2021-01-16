const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");
const logger = require("../utils/logger");
const {
  listWithManyUsers,
  newUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortPassword,
} = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const userPromises = listWithManyUsers.map(
    async (user) => await api.post("/api/users").send(user).expect(201)
  );
  await Promise.all(userPromises);
}, 30000);

test("users are returned as json with correct encoding", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});

test("correct number of users is returned", async () => {
  const response = await api.get("/api/users");
  expect(response.body.length).toBe(listWithManyUsers.length);
});

test("a user is added to database", async () => {
  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8");
  const response = await api.get("/api/users");
  expect(response.body.length).toBe(listWithManyUsers.length + 1);
  const insertedUser = response.body.find((u) => u.name == newUser.name);
  delete insertedUser.id;
  delete insertedUser.blogs;
  Object.entries(insertedUser).forEach(([key, value]) =>
    expect(value).toEqual(newUser[key])
  );
});

test("user without username is not added to database", async () => {
  const response = await api
    .post("/api/users")
    .send(newUserWithoutUsername)
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8");
  expect(response.body).toEqual({
    error: "User validation failed: username: Path `username` is required.",
  });
  const users = await api.get("/api/users");
  expect(users.body.length).toBe(listWithManyUsers.length);
});

test("user without password is not added to database", async () => {
  const response = await api
    .post("/api/users")
    .send(newUserWithoutPassword)
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8");
  expect(response.body).toEqual({
    error: "password length must be greater than 3",
  });
  const users = await api.get("/api/users");
  expect(users.body.length).toBe(listWithManyUsers.length);
});

test("user with a short password is not added to database", async () => {
  const response = await api
    .post("/api/users")
    .send(newUserWithShortPassword)
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8");
  expect(response.body).toEqual({
    error: "password length must be greater than 3",
  });
  const users = await api.get("/api/users");
  expect(users.body.length).toBe(listWithManyUsers.length);
});

test("user with an existing username is not added to database", async () => {
  const response = await api
    .post("/api/users")
    .send(listWithManyUsers[0])
    .expect(400)
    .expect("Content-Type", "application/json; charset=utf-8");
  expect(response.body).toEqual({
    error:
      "User validation failed: username: Error, expected `username` to be unique. Value: `jouni`",
  });
  const users = await api.get("/api/users");
  expect(users.body.length).toBe(listWithManyUsers.length);
});

afterAll(async () => {
  mongoose.connection.close();
});
