import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import adminRoute from "./routes/adminRoute.js";

dotenv.config(); 

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

connectDB(); 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use('/api/analytics',adminRoute)



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
