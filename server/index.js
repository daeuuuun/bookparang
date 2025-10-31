import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import booksRouter from "./routes/books.js";
import reviewRoutes from "./routes/review.js";
import wishlistRoutes from "./routes/wishlists.js";
import cartRoutes from "./routes/carts.js";
import purchaseRoutes from "./routes/purchases.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = 4000;

// ✅ CORS 설정 (쿠키 포함)
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트 주소
    credentials: true, // 쿠키 허용
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB 연결
mongoose
  .connect("mongodb://zoomedia.synology.me:27017/myapp_1g", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ 라우트 설정
app.use("/api/users", userRoutes);
app.use("/api/books", booksRouter);
app.use("/api/auth", userRoutes); // ✅ 인증 확인용 추가
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchase", purchaseRoutes);

// ✅ 알라딘 API 프록시
app.get("/api/aladin", async (req, res) => {
  const { isbn } = req.query;
  if (!isbn) return res.status(400).json({ error: "ISBN is required" });

  try {
    const response = await axios.get("https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx", {
      params: {
        TTBKey: process.env.VITE_ALADIN_TTB_KEY,
        ItemIdType: "ISBN13",
        ItemId: isbn,
        Output: "JS",
        Version: "20131101",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Aladin API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Aladin API" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
