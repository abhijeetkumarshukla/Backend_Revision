const bcrypt = require('bcryptjs');
const UserModel = require('../models/Register');


const userRegistration = async (req,res)=>{
    const {name,email,password} = req.body;

    try {
        let user = await UserModel.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists!'});

        }

        bcrypt.hash(password, 2, async (err, hash) => {
            if (err) {
              return res.status(500).send("Error in hashing password.");
            }

        user = new UserModel({
            name,
            email,
            password:hash
        })
        await user.save();

        res.status(201).send({
            message: `Congratulations ${name} you are registered`,
            "User": user,
          });
    })

    } catch (error) {
        res
      .status(500)
      .send({ message: `Wrong Details try again: ${error.message}` }); 
    }
}
module.exports = userRegistration;