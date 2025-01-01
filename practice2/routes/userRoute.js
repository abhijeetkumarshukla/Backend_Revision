const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(501).json(error);
  }
});

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new userModel({
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json(`you are register as user ${user}.`);
  } catch (error) {
    res.status(400).json(`you are not register as user ${error}.`);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send(`user Not Found.`);
    }
    if (user) {
      if (password == user.password) {
        return res.status(200).json(`login done ${user}.`);
      } else {
        return res.send(`incorrect password.`);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = userRouter;
