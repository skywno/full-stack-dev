const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "wrong username or password" });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 });

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
