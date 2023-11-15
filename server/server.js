const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require("./config/database")
const userAuthRoute = require('./routes/userAuth')
const protectedRoutes = require('./routes/protected')
const { verifyToken } = require('./middleware/authMiddleware')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use("/api/v1", userAuthRoute)
app.use("/api/v1/protected", verifyToken, protectedRoutes)


const port = 3001
const startServer = async () => {
    try {
      await connectDb();
      console.log('Successful connection');
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
    }
};
  
startServer()