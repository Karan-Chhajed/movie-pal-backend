import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

if(!MONGO_URI) {
    throw new Error('Connection URI missing!')
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('DB Connected!')
    } catch (err) {
        console.log('Connection to DB failed! ' + err )
        process.exit(1)
    }
}