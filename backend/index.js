const express = require('express')
const app = express()
const port = 5000
const mongoDb = require('./db')
mongoDb()

//for cors
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'))
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`My app listening on port http://localhost:${port}`)
})