const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)