import mongoose from 'mongoose'
import env from 'dotenv'
env.config();
const mongoURI = process.env.URI;
const mongoDb = () => {
    mongoose.connect(mongoURI)
        .then(async result => {
            console.log('connected');
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray()
                .then(async res => {
                    const foodCategory = await mongoose.connection.db.collection("foodCategory");
                    foodCategory.find({}).toArray()
                    .then(catResponse =>{
                        global.food_items = res
                        global.foodCategory = catResponse;
                    })
                })
                .catch(err => console.log(err));
        })
        .catch((error) => console.log(error))
}

export default mongoDb