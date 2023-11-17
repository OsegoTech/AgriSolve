const express = require("express")
const router = express.Router()
const userAuthController = require("../controllers/userAuthController")
const { verifyToken } = require("../middleware/authMiddleware")
const updateUserController = require("../controllers/updateUserController")
const updatePasswordController = require("../controllers/updatePasswordController")

//Registration
router.post('/register', userAuthController.registerUser)

//Login and Authorization
router.post("/login", userAuthController.loginUser)

//Route for refreshing access tokens
router.post('/refresh-token', userAuthController.refreshAccessToken)

//Profile
router.post('/profile', verifyToken, updateUserController.addProfile)

//Update user
router.put('/update_user', verifyToken, updateUserController.updateUser)

//Update Passord
router.put('/update_password', verifyToken, updatePasswordController.updatePassword)

//Logout
router.post('/logout', userAuthController.logoutUser)

module.exports = router