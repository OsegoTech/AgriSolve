import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: String
    },
    password: {
        type: String,
        required: true
    },
    isFarmer: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    phoneNumber: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
export default User;