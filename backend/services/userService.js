const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { jwtSecret } = require("../config/server");

const registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.User.create({ username, password: hashedPassword });
  return user;
};

const loginUser = async (username, password) => {
  const user = await db.User.findOne({ where: { username } });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }
  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
