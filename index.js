import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js"
import connectdb from "./database/db.js";

dotenv.config();
connectdb();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: "false" }));

app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
