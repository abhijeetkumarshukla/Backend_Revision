const express = require('express');
const { connection } = require('mongoose');
const UserRouter = require('./routes/User.routes');
const server = express()
const PORT = 3000;

server.use(express.json())
server.use('/user', UserRouter)


server.listen(PORT, async (req,res)=>{
    try {
        await connection
         console.log(`server is running on port ${PORT}.`)
    } catch (error) {
        console.log(error)
    }
})