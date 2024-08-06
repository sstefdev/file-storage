const userService = require("../services/userService");
const logger = require("../utils/logger");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.registerUser(username, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await userService.loginUser(username, password);
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
