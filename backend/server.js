import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import userRouter from "./routes/userRouter.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// DB
import { connect_db } from "./config/db.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*",
}));

app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", userRouter);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

// ================= STATIC FILES (UPLOADS) =================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

// ================= SERVE FRONTEND =================
// IMPORTANT: Make sure dist folder exists inside backend

app.use(express.static(path.join(__dirname, "dist")));

// React Router support (VERY IMPORTANT)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR:", err);
  res.status(500).json({ error: err.message });
});

// ================= START SERVER =================
const startServer = async () => {
  try {
    console.log("🚀 Starting server...");

    await connect_db();
    console.log("✅ Database connected successfully!");

    const PORT = process.env.PORT || 40000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("💥 SERVER START ERROR:", error);
    process.exit(1);
  }
};

startServer();