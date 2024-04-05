import mongoose from "mongoose";


const DB_NAME = 'todoApp';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ", error);
        process.exit(1);
    }

}

export default connectDB;