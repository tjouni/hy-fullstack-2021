const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const {
  listWithManyBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  testUser,
} = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

const getTokenHeader = async () => {
  const result = await api.post("/api/login").send(testUser);
  return `Bearer ${result.body.token}`;
};

beforeAll(async () => {
  await api.post("/api/users").send({ username: "test", password: "test" });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listWithManyBlogs);
});

test("blogs are returned as json with correct encoding", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});

test("correct number of blogs is returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(listWithManyBlogs.length);
});

test("all titles are returned", async () => {
  const response = await api.get("/api/blogs");
  const titles = listWithManyBlogs.map((blog) => blog.title);
  const returnedTitles = response.body.map((blog) => blog.title);
  titles.forEach((title) => expect(returnedTitles).toContain(title));
});

test("all blogs have _id field renamed to id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => expect(blog._id).not.toBeDefined());
  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("a blog is added to database", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", tokenHeader)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8");
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(listWithManyBlogs.length + 1);
});

test("a blog with correct data is added to database", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .set("Authorization", tokenHeader)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8");
  const response = await api.get("/api/blogs");
  const [lastBlog] = response.body.slice(-1);
  delete lastBlog.id;
  delete lastBlog.user;
  expect(lastBlog).toEqual(JSON.parse(JSON.stringify(newBlog)));
});

test("a blog posted without token is not added to database", async () => {
  await api.post("/api/blogs").send(newBlog).expect(401);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toBe(listWithManyBlogs.length);
});

test("a blog with without likes is added to database with zero likes", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .send(newBlogWithoutLikes)
    .set("Authorization", tokenHeader)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8");
  const response = await api.get("/api/blogs");
  const [lastBlog] = response.body.slice(-1);
  expect(lastBlog.likes).toEqual(0);
});

test("a blog with without a title is not added to database", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .send(newBlogWithoutTitle)
    .set("Authorization", tokenHeader)
    .expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toEqual(listWithManyBlogs.length);
});

test("a blog with without an url is not added to database", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .send(newBlogWithoutUrl)
    .set("Authorization", tokenHeader)
    .expect(400);
  const response = await api.get("/api/blogs");
  expect(response.body.length).toEqual(listWithManyBlogs.length);
});

test("a blog is deleted", async () => {
  const tokenHeader = await getTokenHeader();
  await api
    .post("/api/blogs")
    .set("Authorization", tokenHeader)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8");
  const response = await api.get("/api/blogs");
  const [lastBlog] = response.body.slice(-1);
  await api
    .delete(`/api/blogs/${lastBlog.id}`)
    .set("Authorization", tokenHeader)
    .expect(204);
  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body.length).toEqual(listWithManyBlogs.length);
});

test("a non-existant blog is not deleted", async () => {
  const tokenHeader = await getTokenHeader();
  const response = await api.get("/api/blogs");
  const [lastBlog] = response.body.slice(-1);
  const invalidId = lastBlog.id.replace(/.$/, "1");
  await api
    .delete(`/api/blogs/${invalidId}`)
    .set("Authorization", tokenHeader)
    .expect(404);
  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body.length).toEqual(listWithManyBlogs.length);
});

test("a blog with malformed id is not deleted", async () => {
  const tokenHeader = await getTokenHeader();
  const invalidId = "123";
  await api
    .delete(`/api/blogs/${invalidId}`)
    .set("Authorization", tokenHeader)
    .expect(400);
  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body.length).toEqual(listWithManyBlogs.length);
});

test("a blog can is updated correctly", async () => {
  const tokenHeader = await getTokenHeader();
  const response = await api.get("/api/blogs");
  const blog = {
    title: "updated blog",
    url: "updated.com",
    author: "updated author",
    likes: 1001,
  };
  await api
    .put(`/api/blogs/${response.body[0].id}`)
    .send(blog)
    .set("Authorization", tokenHeader);
  expect(200);
  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body.length).toEqual(listWithManyBlogs.length);
  const updatedBlog = newResponse.body.find((b) => b.title === blog.title);
  delete updatedBlog.id;
  expect(updatedBlog).toEqual(blog);
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
