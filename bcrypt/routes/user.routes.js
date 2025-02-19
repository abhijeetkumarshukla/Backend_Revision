const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model');
const userRouter = express.Router();
require('dotenv').config()

userRouter.post('/register', (req, res) => {
    const { username, email, password } = req.body

    try {
        bcrypt.hash(password, 2, async function (err, hashed) {
            if (err) {
                res.status(400).json(`something went err while hashing`)
            } else {
                const user = new UserModel({
                    username,
                    email,
                    password: hashed
                })
                await user.save();
                res.status(201).json(`registration done. ${user}`)
            }
        })

    } catch (error) {
        res.status(400).json({ message: `registration filed`, error })
    }
})


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(400).json(`something went err while comparing ${err}`)
                } if (result) {
                    const token = jwt.sign({ email: user.email, userID: user.id }, process.env.SECRET_KEY)

                    res.status(201).json(`Login done. ${user}  =>${token}`)

                }
            })

        } else {
            res.status(401).json({ message: `user not found` })
        }

    } catch (error) {
        res.status(400).json({ message: `login filed`, error })
    }
})

module.exports = userRouter