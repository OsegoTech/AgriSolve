import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/DB.js";
import productsRoute from "./routes/productsRoute.js";
import orderRoute from "./routes/orderRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import protectedRoute from "./routes/protectedRoute.js"
import { verifyToken } from "./middlewares/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes)
app.use("/api/products", productsRoute);
app.use("/api/orders",orderRoute)
app.use("/api/protected", verifyToken, protectedRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
