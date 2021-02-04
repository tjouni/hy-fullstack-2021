const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
    id: 1,
  });
  return response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    name: 1,
    username: 1,
    id: 1,
  });
  return response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }
  const user = await User.findById(token.id);
  request.body.user = user._id;
  request.body.likes = request.body.likes || 0;
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const result = await Blog.findById(savedBlog._id).populate("user", {
    name: 1,
    username: 1,
    id: 1,
  });
  return response.status(201).json(result);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!request.body.comment) {
    return response.status(400).end();
  }
  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments || [];
  blog.comments = blog.comments.concat(request.body.comment);
  const result = await blog.save();
  return response.json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }
    if (blog.user.toString() !== token.id) {
      throw { message: "user can only delete blogs they created" };
    }
    await Blog.deleteOne(blog);
    return response.status(204).json(blog).end();
  } catch (error) {
    return response.status(400).send({ error: error.message }).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end();
  }
  request.body.likes = request.body.likes || 0;
  const { title, url, author, likes } = request.body;
  const blog = { title, url, likes };
  if (author) {
    blog.author = author;
  }
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    return result ? response.json(result) : response.status(404).end();
  } catch {
    return response.status(400).end();
  }
});

module.exports = blogsRouter;
