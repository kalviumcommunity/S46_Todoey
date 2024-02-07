const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { userValidator } = require("../extras/validator");
const { hash, verify } = require("../extras/paswordHasher");

router.post("/signup", async (req, res) => {
  const { error, value } = userValidator(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error.details);
  }

  const { email, password } = value;

  const user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await hash(password);
    const newUser = await User.create({ email, password: hashedPassword });
    return res.status(200).json({ newUser });
  }

  res.status(400).json({ ERROR: "User already exists" });
});

router.post("/login", async (req, res) => {
    const { error, value } = userValidator(req.body);

    if (error) {
        return res.status(400).send(error.details)
    }

    const { email, password } = value
    
    const user = await User.findOne({ email })
    
    if (user) {
        const hashedPassword = user.password
        const passwordIsCorrect = await verify(password, hashedPassword)

        if (passwordIsCorrect) {
            return res.status(200).json({"Success":'Login Successful'})
        }
        return res.status(400).json({'ERROR':'Incorrect password'})
    }

    res.status(400).json({'ERROR':'User not available'})
})

module.exports = router;
