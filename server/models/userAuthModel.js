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
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String, 
        required: true
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)