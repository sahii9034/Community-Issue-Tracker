const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware with increased payload limit for Base64 images
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ⬇️ Register issue routes
const issueRoutes = require("./routes/issueRoutes");
app.use("/api/issues", issueRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
app.use(express.json());
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);



// 🔗 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🔍 Test Route
app.get("/", (req, res) => {
  res.send("CivicLens Backend Running");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
