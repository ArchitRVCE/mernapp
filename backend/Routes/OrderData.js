const express = require('express')
const router = express.Router()
const OrderData = require('../models/Orders')
router.post('/placeOrder', async (req, res) => {
    let data = req.body.order_data;
    console.log('data incoming ', data);
    await data.splice(0, 0, { Order_date: req.body.order_date });
    //if email is new i.e first order
    let eID = await OrderData.findOne({ 'email': req.body.email });
    //console.log(eID);
    if (eID === null) {
        await OrderData.create({
            email: req.body.email,
            order_data: [data]
        }).then(() => res.status(200).json({ success: true }))
            .catch(err => res.status(400).json({ error: "Server Error", message: err.message }))
    }
    else {
        await OrderData.findOneAndUpdate({ email: req.body.email },
            { $push: { order_data: data } }).then(() => {
                res.json({ success: true })
            })
            .catch(err => res.json({ success: false, message: err.message }))
    }
});

router.post("/getMyOrders", async (req, res) => {
    let emailId = req.body.emailId;
    await OrderData.findOne({ email: emailId })
        .then(response => {
            res.status(200).json({ success: true,orderData: response})
        })
        .catch(error => res.status(400).send("Server error",error.message))
})
module.exports = router