const express = require('express')
const router = express.Router()
const protectedController = require("../controllers/protectedController")

router.get('/', protectedController.getProtectedRoute)
router.get('/profile', protectedController.getProfileRoute)

module.exports = router