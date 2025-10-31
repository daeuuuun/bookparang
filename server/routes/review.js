import express from "express";
import axios from "axios";
import Review from "../models/Review.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/* ---------------------------- 리뷰 등록 ---------------------------- */
router.post("/:isbn", auth, async (req, res) => {
  try {
    const { isbn } = req.params;
    const { rating: rawRating, comment, title, author, image } = req.body;
    const rating = Number(rawRating);

    const userId = req.user.userId;
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    // 1️⃣ 리뷰 생성
    const newReview = new Review({
      isbn,
      rating,
      comment,
      user: {
        id: user.userId,       // ✅ 고유 ID 저장
        nickname: user.nickname, // ✅ 표시용 닉네임 저장
      },
    });
    await newReview.save();

    // 2️⃣ 평균 계산
    const reviews = await Review.find({ isbn });
    const avgUserRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
        : rating;

    // 3️⃣ 책 데이터 업데이트
    let book = await Book.findOne({ isbn });
    if (!book) {
      book = new Book({ isbn, title, author, image, rating: 0 });
      await book.save();
    }

    const aladinRating = Number(book.rating) || 0;
    const combinedRating = Number(((aladinRating + avgUserRating) / 2).toFixed(1));
    book.rating = combinedRating;
    await book.save();

    res.status(201).json({
      message: "✅ 리뷰가 등록되었습니다.",
      review: newReview,
      avgUserRating,
      combinedRating,
    });
  } catch (err) {
    console.error("❌ 리뷰 등록 실패:", err);
    res.status(500).json({ message: "서버 오류로 리뷰 등록 실패" });
  }
});

/* ---------------------------- 리뷰 목록 ---------------------------- */
router.get("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const reviews = await Review.find({ isbn }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("❌ 리뷰 목록 불러오기 실패:", err);
    res.status(500).json({ message: "리뷰 목록 불러오기 실패" });
  }
});

/* ---------------------------- 리뷰 수정 ---------------------------- */
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });

    const user = await User.findOne({ userId: req.user.userId });
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    // ✅ 작성자 본인인지 확인
    if (review.user.id !== req.user.userId) {
      return res.status(403).json({ message: "본인만 리뷰를 수정할 수 있습니다." });
    }

    // 수정 적용
    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.json({ message: "✅ 리뷰가 수정되었습니다.", review });
  } catch (err) {
    console.error("❌ 리뷰 수정 실패:", err);
    res.status(500).json({ message: "서버 오류로 리뷰 수정 실패" });
  }
});

/* ---------------------------- 리뷰 삭제 ---------------------------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });

    const user = await User.findOne({ userId: req.user.userId });
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    // 🔒 작성자 본인 확인
    if (review.user.id !== req.user.userId) {
      return res.status(403).json({ message: "본인만 리뷰를 삭제할 수 있습니다." });
    }

    await Review.findByIdAndDelete(id);
    res.json({ message: "🗑️ 리뷰가 삭제되었습니다." });
  } catch (err) {
    console.error("❌ 리뷰 삭제 실패:", err);
    res.status(500).json({ message: "서버 오류로 리뷰 삭제 실패" });
  }
});

export default router;
