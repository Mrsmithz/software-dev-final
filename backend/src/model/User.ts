import { Schema, model} from 'mongoose'

const UserSchema : Schema = new Schema({
    firstName:String,
    lastName:String,
    email:String
}, { timestamps: true})

const User = model('User', UserSchema)

export default User
