const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!password || password.length < 4) {
    return response
      .status(400)
      .send({ error: "password length must be greater than 3" })
      .end();
  }
  const saltRounds = 16;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
});

module.exports = usersRouter;
