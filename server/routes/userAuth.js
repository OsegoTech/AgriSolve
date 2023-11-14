const express = require("express")
const router = express.Router()
const userAuthController = require("../controllers/userAuthController")

//Registration
router.post('/register', userAuthController.registerUser)

//Login and Authorization
router.post("/login", userAuthController.loginUser)

//Logout
router.post('/logout', userAuthController.logoutUser)

module.exports = router