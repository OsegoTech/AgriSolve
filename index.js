import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/DB.js";
import productsRoute from "./routes/productsRoute.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productsRoute);
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
