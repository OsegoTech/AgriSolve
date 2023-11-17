const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: String
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
        type: String
    },
    phoneNumber: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)
