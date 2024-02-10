const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const verifyToken = async (token) => {
  const { _id } = jwt.verify(token, process.env.SECRET);
  const res = await User.findOne({ _id }).select("_id");
  return res;
};

module.exports = {
  createToken,
  verifyToken,
};
