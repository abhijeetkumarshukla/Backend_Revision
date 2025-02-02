const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ message: "something went wrong while comparing.", err });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, userId: user.id },
            process.env.SECRET_KEY
          );
          res
            .status(201)
            .json({ message: "login sussuccesfull.", user, token: token });
        }
      });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "login failed", error });
    console.log(error);
  }
};

module.exports = userLogin;
