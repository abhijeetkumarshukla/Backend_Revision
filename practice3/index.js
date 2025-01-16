const express = require('express');

const app = express()
const PORT = 3000

app.get('/', (req,res)=>{
    console.log('hello')
    
})

app.listen(PORT,(req,res)=>{
    console.log(`sever is running on port ${PORT}.`)
})