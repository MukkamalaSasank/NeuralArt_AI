import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://neural-art-ai.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/model", modelRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from NeuralArt AI backend!");
});

// Define PORT for Render
const PORT = 8080;

// Start Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

startServer();
