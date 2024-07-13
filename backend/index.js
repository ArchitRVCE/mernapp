import express from 'express'
const app = express()
const port = 5000
import mongoDb from './db.js'
import CreateUser from './Routes/CreateUser.js'
import DisplayData from './Routes/DisplayData.js'
import OrderData from './Routes/OrderData.js'

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
app.use('/api',CreateUser)
app.use('/api',DisplayData)
app.use('/api',OrderData)

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`My app listening on port http://localhost:${port}`)
})