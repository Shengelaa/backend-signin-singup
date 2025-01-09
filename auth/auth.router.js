const { Router } = require("express");
const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const authRouter = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ message: "wrong params" });

  const existUser = await usersModel.findOne({ email: email });
  if (existUser)
    return res.status(400).json({ message: "user already exists" });

  console.log(password, "password");

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "HashedPassword");
  await usersModel.create({ fullName, email, password: hashedPassword });
  res.status(201).json({ message: "user created successfully" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email or password is required" });
  const existUser = await usersModel.findOne({ email });
  if (!existUser)
    return res.status(400).json({ message: "Email or Password is Incorrect" });
  const isPasswordEqual = await bcrypt.compare(password, existUser.password);
  if (!isPasswordEqual)
    return res.status(400).json({ message: "Email or Password is Incorrect" });

  const payLoad = {
    userId: existUser._id,
  };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = authRouter;
