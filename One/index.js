const express = require('express');
const connection = require('./config/db')
 

const app = express()
const PORT = 3000

app.use(express.json());

app.use('/user', require('./routes/auth'))



app.get('/',(req,res)=>{
    res.status(200).send('welcome Page')
}) 


app.listen(PORT,async()=>{
   try {
    await  connection
    console.log(`app is running on Port ${PORT}`)
   } catch (error) {
      console.log('Failed to connect to database:', error.message)
   }
})