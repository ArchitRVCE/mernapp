const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://RoyalFood:welcome123@royaldelicacy.hzad4rj.mongodb.net/?retryWrites=true&w=majority&appName=royalDelicacy'
const mongoDb = ()=>{
    mongoose.connect(mongoURI)
    .then(result=>console.log('connected'))
    .catch((error)=>console.log(error))
}

module.exports = mongoDb