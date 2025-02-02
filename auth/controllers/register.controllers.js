const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const userRegister = (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 3, async function (err, hashed) {
      if (err) {
        res
          .status(400)
          .json({ message: `something went wrong while hashing`, err });
      } else {
        const user = new UserModel({
          name,
          email,
          password: hashed,
        });
        await user.save();
        res
          .status(201)
          .json({ message: `user registration sussuccesful`, user });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "user registration failed", error });
  }
};

module.exports = userRegister;
