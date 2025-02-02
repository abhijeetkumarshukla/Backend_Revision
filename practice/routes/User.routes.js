const express = require('express');
const UserModel = require('../model/User.model');
const UserRouter = express.Router();


UserRouter.post('/register', async(req,res)=>{
    const {username,email,password} = req.body;

    try {
        const user = new UserModel ({
            username,
            email,
            password
        })
        await user.save();
        res.status(200).json("register done.")
    } catch (error) {
        res.status(400).json(`register failed ${error} `)
    }
})

UserRouter.post('/login', async(req,res)=>{
   const {email,password}= req.body;
   try {
     const user = await UserModel.findOne({email})

     if(!user){
        return res.send('user not found.')
     }
     if(user){if(password==user.password){
        return res.status(200).json(`login done ${user}.`)
     }else{
        return res.send('incorrect password.')
     }
    }
   } catch (error) {
     res.status(501).json(error)
   }

})

UserRouter.get("/",async(req,res)=>{
    res.send("check register")
})


module.exports = UserRouter;