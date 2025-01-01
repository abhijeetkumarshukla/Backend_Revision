require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Register');


const userLogin = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(401).send({message:'Worng Email, Register first'});

        }

        bcrypt.compare(password,user.password, async (err,result)=>{
         if(err){
            return res.status(500).send({message : `Error in Comparing password: ${err.message}`});

         }

         if (result){
            const token = await jwt.sign(
                {
                    name: user.name,
                    email:user.email,
                    userID: user._id,
                },
                process.env.JWT_SECRET
            )

            return res.status(200).send({message:'Login successful', 'token':token,'user':user });

         }else{
            return res.status(401).send({message:'Incorrect password'});

         }
        });

    } catch (error) {
        return res.status(500).send({message:`Error : ${error.message}`});
    }
};

module.exports = userLogin;