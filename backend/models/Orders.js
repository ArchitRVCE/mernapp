const mongoose = require('mongoose')

const { Schema} = mongoose

const OrderSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    order_data:{
        type: Array,
        required:true
    }
})

module.exports = mongoose.model('orderData',OrderSchema)