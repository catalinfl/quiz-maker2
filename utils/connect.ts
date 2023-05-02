import mongoose, { ConnectOptions } from 'mongoose'

export const connectMongo = async () => {
    mongoose.connect(process.env.MONGODB_URI as string)
    console.log("db connected")
}

export default connectMongo