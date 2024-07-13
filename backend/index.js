import express from 'express'
const app = express()
const port = 5000
import mongoDb from './db.js'
import CreateUser from './Routes/CreateUser.js'
import DisplayData from './Routes/DisplayData.js'
import OrderData from './Routes/OrderData.js'
import path from 'path'

mongoDb()

const __dirname = path.resolve();

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

app.listen(port,()=>{
    console.log(`My app listening on port http://localhost:${port}`)
})

app.use(express.static(path.join(__dirname,'/client/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})