import express from'express'
const router = express.Router()

router.post('/fetchData',(req,res)=>{
    try{
        //console.log(global.food_items,global.foodCategory)
        res.send([global.food_items,global.foodCategory])
    }
    catch(error){
        console.error(error.message);
        res.send("Server error")
    }
})

export default router