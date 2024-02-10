const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { userValidator } = require("../extras/validator");
const { hash, verify } = require("../extras/paswordHasher");
const {createToken} = require('../extras/auth')

router.post("/signup", async (req, res) => {
  const { error, value } = userValidator(req.body);

  if (error) {
    return res.status(400).send(error.details);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await hash(password);
    const newUser = await User.create({ email, password: hashedPassword });
    const token = createToken(newUser._id)
    return res.status(200).json({email: newUser.email, token});
  }

  res.status(400).json({ error: "User already exists" });
});

router.post("/login", async (req, res) => {
  const { error, value } = userValidator(req.body);

  if (error) {
    return res.status(400).send(error.details);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });
  
  if (user) {
    const hashedPassword = user.password;
    const passwordIsCorrect = await verify(password, hashedPassword);
    const token = createToken(user._id)

    if (passwordIsCorrect) {
      return res.status(200).json({email: user.email, token});
    }
    return res.status(400).json({ error: "Incorrect password" });
  }

  res.status(400).json({ error: "User not available" });
});

module.exports = router;
