const express = require('express')
const app = express()
const port = 5000
const mongoDb = require('./db')
mongoDb()

app.use(express.json());
app.use('/api',require('./Routes/CreateUser'))
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`My app listening on port http://localhost:${port}`)
})