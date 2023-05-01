import mongoose, { ConnectOptions } from 'mongoose'

const connect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    return mongoose.connect(process.env.MONGODB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
}