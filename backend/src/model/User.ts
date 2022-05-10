import { Schema, model} from 'mongoose'

const UserSchema : Schema = new Schema({
    firstName:String,
    lastName:String,
    namePrefix:String,
    cardPrefix:String,
    cardId:Number,
    birthDate:Date,
    address:Object,
    tel:Number,
    vaccine:[{
        type: String,
        enum:['3rd', '4th', '3ch'],
        required:true
    }],
    location:String,
    vaccineDate:[
        {
            type:Date
        }
    ]
}, { timestamps: true})

const User = model('User', UserSchema)

export default User
