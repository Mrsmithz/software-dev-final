import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path: `.env.${process.env.NODE_ENV}`})


const connectToDB = async (uri : string) => {
    return await mongoose.connect(uri, {
        autoIndex:true,
        keepAlive:true,
        maxPoolSize:50
    })
}
const disconnectFromDB = async () => {
    return await mongoose.connection.close()
}

const clearDB = async (except : string[] = []) => {
    const collections = mongoose.connection.collections
    for (const key in collections){
        if (!except.some(ex => ex === key)){
            const collection = collections[key]
            await collection.deleteMany({})
        }

    }
}
export { connectToDB, disconnectFromDB, clearDB}