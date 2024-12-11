const express = require('express');
const userModel = require('../model/User.model');
const UserRouter = express.Router();


UserRouter.post('/register', async(req,res)=>{
    const {username,email,password} = req.body;

    try {
        const user = userModel({
            username,
            email,
            password
        })
        await user.save();
        res.status(201).json("register done.")
    } catch (error) {
        res.status(400).json(`register failed `)
    }
})

UserRouter.get("/",async(req,res)=>{
    res.send("check register")
})


module.exports = UserRouter;