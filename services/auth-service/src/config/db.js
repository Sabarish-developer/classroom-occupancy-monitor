import mongoose from 'mongoose';
import {config} from './config.js';

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`MongoDb connected successfully with ${conn.connection.host}`);
    }
    catch(e){
        console.error("Error connecting MongoDb: ", e.message);
        process.exit(1);
    }
}

export default connectDB;