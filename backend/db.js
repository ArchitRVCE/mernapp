const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://RoyalFood:welcome123@royaldelicacy.hzad4rj.mongodb.net/MERNDB?retryWrites=true&w=majority&appName=royalDelicacy'
const mongoDb = () => {
    mongoose.connect(mongoURI)
        .then(async result => {
            console.log('connected');
            // const fetched_data = await mongoose.connection.collection("food_items");
            // fetched_data.find({}).toArray()
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
        })
        .catch((error) => console.log(error))
}

module.exports = mongoDb