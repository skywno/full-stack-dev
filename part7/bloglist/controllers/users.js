const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", "-user");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  // 1. request.body에서 username, user, password를 받는다.
  const { username, name, password } = request.body;
  if (password.length < 3) {
    response.status(400).send({ error: "invalid username or password" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // 2. valid user인지 확인한다.
  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });
  // 3. password를 hash 한다.
  const newUser = await user.save();
  // 3. 저장한 후 성공 결과를 return
  response.json(newUser);
});

module.exports = usersRouter;
