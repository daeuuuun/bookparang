import express from "express";
import auth from "../middlewares/auth.js";
import Inquiry from "../models/Inquiry.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ 1. 사용자 — 문의 등록
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "모든 항목을 입력해주세요." });

    const newInquiry = new Inquiry({
      userId: req.user.userId,
      title,
      content,
    });

    await newInquiry.save();
    res.status(201).json({ message: "문의가 등록되었습니다." });
  } catch (error) {
    console.error("❌ 문의 등록 에러:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// ✅ 2. 사용자 — 내 문의 조회
router.get("/my", auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// ✅ 3. 관리자 — 전체 문의 조회
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (user.role !== "admin") {
      return res.status(403).json({ error: "관리자만 접근 가능합니다." });
    }
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// ✅ 4. 관리자 — 문의 답변 등록
router.put("/:id/answer", auth, async (req, res) => {
  try {
    const { answer } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    if (user.role !== "admin") {
      return res.status(403).json({ error: "관리자만 접근 가능합니다." });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { answer, status: "answered" },
      { new: true }
    );

    res.json({ message: "답변이 등록되었습니다.", inquiry });
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
