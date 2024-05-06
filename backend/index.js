const express = require('express')
const app = express()
const port = 5000
const mongoDb = require('./db')
mongoDb()
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`My app listening on port ${port}`)
})