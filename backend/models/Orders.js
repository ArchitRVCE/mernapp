import mongoose from 'mongoose'


const OrderSchema = new mongoose.Schema({
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

const orderData = mongoose.model('orderData',OrderSchema)
export default orderData